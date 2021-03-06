import * as plugins from './smartsocket.plugins';
import * as pluginsTyped from './smartsocket.pluginstyped';
import * as interfaces from './interfaces';

import { SocketConnection } from './smartsocket.classes.socketconnection';
import {
  ISocketFunctionCallDataRequest,
  SocketFunction,
} from './smartsocket.classes.socketfunction';
import { ISocketRequestDataObject, SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';
import { logger } from './smartsocket.logging';

/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
  port: number;
  url: string;
  alias: string; // an alias makes it easier to identify this client in a multo client environment
  role: string;
  password: string; // by setting a password access to functions can be limited
  autoReconnect?: boolean;
}

export class SmartsocketClient {
  // a unique id
  public shortId = plugins.isounique.uni();

  // the shortId of the remote we connect to
  public remoteShortId: string = null;

  public alias: string;
  public socketRole: SocketRole;
  public socketConnection: SocketConnection;
  public serverUrl: string;
  public serverPort: number;
  public autoReconnect: boolean;

  // status handling
  public eventSubject = new plugins.smartrx.rxjs.Subject<interfaces.TConnectionStatus>();
  public eventStatus: interfaces.TConnectionStatus = 'new';

  public socketFunctions = new plugins.lik.ObjectMap<SocketFunction<any>>();
  public socketRequests = new plugins.lik.ObjectMap<SocketRequest<any>>();
  public socketRoles = new plugins.lik.ObjectMap<SocketRole>();

  // tagStore
  private tagStore: { [key: string]: interfaces.ITag } = {};
  private tagStoreSubscription: plugins.smartrx.rxjs.Subscription;

  /**
   * adds a tag to a connection
   */
  public async addTag(tagArg: interfaces.ITag) {
    if (this.socketConnection) {
      await this.socketConnection.addTag(tagArg);
    } else {
      this.tagStore[tagArg.id] = tagArg;
    }
  }

  /**
   * gets a tag by id
   * @param tagIdArg
   */
  public async getTagById(tagIdArg: interfaces.ITag['id']) {
    return this.tagStore[tagIdArg];
  }

  /**
   * removes a tag from a connection
   */
  public async removeTagById(tagIdArg: interfaces.ITag['id']) {
    if (this.socketConnection) {
      this.socketConnection.removeTagById(tagIdArg);
    } else {
      delete this.tagStore[tagIdArg];
    }
  }

  constructor(optionsArg: ISmartsocketClientOptions) {
    this.alias = optionsArg.alias;
    this.serverUrl = optionsArg.url;
    this.serverPort = optionsArg.port;
    this.socketRole = new SocketRole({
      name: optionsArg.role,
      passwordHash: optionsArg.password,
    });
    this.autoReconnect = optionsArg.autoReconnect;
  }

  public addSocketFunction(socketFunction: SocketFunction<any>) {
    this.socketFunctions.add(socketFunction);
    this.socketRole.allowedFunctions.add(socketFunction);
  }

  /**
   * connect the client to the server
   */
  public async connect() {
    const done = plugins.smartpromise.defer();
    const smartenvInstance = new plugins.smartenv.Smartenv();
    const socketIoClient = await smartenvInstance.getEnvAwareModule({
      nodeModuleName: 'socket.io-client',
      webUrlArg: 'https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js',
      getFunction: () => {
        return globalThis.io;
      },
    });
    logger.log('info', 'trying to connect...');
    const socketUrl = `${this.serverUrl}:${this.serverPort}`;
    this.socketConnection = new SocketConnection({
      alias: this.alias,
      authenticated: false,
      role: this.socketRole,
      side: 'client',
      smartsocketHost: this,
      socket: await socketIoClient.connect(socketUrl, {
        multiplex: false,
        reconnectionAttempts: 5,
        rejectUnauthorized: socketUrl.startsWith('https://localhost') ? false : true,
      }),
    });

    const timer = new plugins.smarttime.Timer(5000);
    timer.start();
    timer.completed.then(() => {
      logger.log('warn', 'connection to server timed out.');
      this.disconnect();
    });

    // authentication flow
    this.socketConnection.socket.on(
      'requestAuth',
      (requestAuthPayload: interfaces.IRequestAuthPayload) => {
        timer.reset();
        logger.log('info', 'server requested authentication');

        // lets register the authenticated event
        this.socketConnection.socket.on('authenticated', () => {
          this.remoteShortId = requestAuthPayload.serverShortId;
          logger.log('info', 'client is authenticated');
          this.socketConnection.authenticated = true;
          this.socketConnection.listenToFunctionRequests();
          done.resolve();
        });

        // lets register the forbidden event
        this.socketConnection.socket.on('forbidden', async () => {
          logger.log('warn', `disconnecting due to being forbidden to use the ressource`);
          await this.disconnect();
        });

        // lets provide the actual auth data
        this.socketConnection.socket.emit('dataAuth', {
          role: this.socketRole.name,
          password: this.socketRole.passwordHash,
          alias: this.alias,
        });
      }
    );

    // handle connection
    this.socketConnection.socket.on('connect', async () => {
      this.tagStoreSubscription?.unsubscribe();
      for (const keyArg of Object.keys(this.tagStore)) {
        this.socketConnection.addTag(this.tagStore[keyArg]);
      }
      this.tagStoreSubscription = this.socketConnection.tagStoreObservable.subscribe(
        (tagStoreArg) => {
          this.tagStore = tagStoreArg;
        }
      );
      
      this.updateStatus('connected');
    });

    // handle disconnection and errors
    this.socketConnection.socket.on('disconnect', async () => {
      await this.disconnect();
    });

    this.socketConnection.socket.on('reconnect_failed', async () => {
      await this.disconnect();
    });
    this.socketConnection.socket.on('connect_error', async () => {
      await this.disconnect();
    });
    return done.promise;
  }

  /**
   * disconnect from the server
   */
  public async disconnect() {
    if (this.socketConnection) {
      await this.socketConnection.disconnect();
      this.socketConnection = undefined;
      logger.log('ok', 'disconnected!');
    }
    logger.log('warn', `disconnected from server ${this.remoteShortId}`);
    this.remoteShortId = null;
    this.updateStatus('disconnected');

    if (this.autoReconnect) {
      this.tryDebouncedReconnect();
    }
  }

  /**
   * stops the client completely
   */
  public async stop() {
    this.autoReconnect = false;
    await this.disconnect();
  }

  /**
   * try a reconnection
   */
  public async tryDebouncedReconnect() {
    await plugins.smartdelay.delayForRandom(10000, 60000);
    await this.connect();
  }

  /**
   * dispatches a server call
   * @param functionNameArg
   * @param dataArg
   */
  public async serverCall<T extends plugins.typedrequestInterfaces.ITypedRequest>(
    functionNameArg: T['method'],
    dataArg: T['request']
  ): Promise<T['response']> {
    const done = plugins.smartpromise.defer();
    const socketRequest = new SocketRequest<T>(this, {
      side: 'requesting',
      originSocketConnection: this.socketConnection,
      shortId: plugins.isounique.uni(),
      funcCallData: {
        funcName: functionNameArg,
        funcDataArg: dataArg,
      },
    });
    const response = await socketRequest.dispatch();
    const result = response.funcDataArg;
    return result;
  }

  private updateStatus(statusArg: interfaces.TConnectionStatus) {
    if (this.eventStatus !== statusArg) {
      this.eventSubject.next(statusArg);
    }
    this.eventStatus = statusArg;
  }
}
