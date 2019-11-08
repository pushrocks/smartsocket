import * as plugins from './smartsocket.plugins';
import * as interfaces from './interfaces';

import { SocketConnection } from './smartsocket.classes.socketconnection';
import { ISocketFunctionCallDataRequest, SocketFunction } from './smartsocket.classes.socketfunction';
import { ISocketRequestDataObject, SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';
import { defaultLogger } from '@pushrocks/smartlog';

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
  public shortId = plugins.smartunique.shortId();

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

  public socketFunctions = new plugins.lik.Objectmap<SocketFunction<any>>();
  public socketRequests = new plugins.lik.Objectmap<SocketRequest<any>>();
  public socketRoles = new plugins.lik.Objectmap<SocketRole>();

  constructor(optionsArg: ISmartsocketClientOptions) {
    this.alias = optionsArg.alias;
    this.serverUrl = optionsArg.url;
    this.serverPort = optionsArg.port;
    this.socketRole = new SocketRole({
      name: optionsArg.role,
      passwordHash: optionsArg.password
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
  public connect() {
    const done = plugins.smartpromise.defer();
    plugins.smartlog.defaultLogger.log('info', 'trying to connect...');
    const socketUrl = `${this.serverUrl}:${this.serverPort}`;
    this.socketConnection = new SocketConnection({
      alias: this.alias,
      authenticated: false,
      role: this.socketRole,
      side: 'client',
      smartsocketHost: this,
      socket: plugins.socketIoClient(socketUrl, {
        multiplex: false,
        reconnectionAttempts: 5,
      })
    });

    const timer = new plugins.smarttime.Timer(5000);
    timer.start();
    timer.completed.then(() => {
      defaultLogger.log('warn', 'connection to server timed out.');
      this.disconnect();
    });

    // authentication flow
    this.socketConnection.socket.on('requestAuth', (requestAuthPayload: interfaces.IRequestAuthPayload) => {
      timer.reset();
      plugins.smartlog.defaultLogger.log('info', 'server requested authentication');
      
      // lets register the authenticated event
      this.socketConnection.socket.on('authenticated', () => {
        this.remoteShortId = requestAuthPayload.serverShortId;
        plugins.smartlog.defaultLogger.log('info', 'client is authenticated');
        this.socketConnection.authenticated = true;
        this.socketConnection.listenToFunctionRequests();
        done.resolve();
      });

      // lets register the forbidden event
      this.socketConnection.socket.on('forbidden', async () => {
        defaultLogger.log('warn', `disconnecting due to being forbidden to use the ressource`);
        await this.disconnect();
      });

      // lets provide the actual auth data
      this.socketConnection.socket.emit('dataAuth', {
        role: this.socketRole.name,
        password: this.socketRole.passwordHash,
        alias: this.alias
      });

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
      this.socketConnection.disconnect();
      this.socketConnection = undefined;
      plugins.smartlog.defaultLogger.log('ok', 'disconnected!');
    }
    defaultLogger.log('warn', `disconnected from server ${this.remoteShortId}`);
    this.remoteShortId = null;
    this.updateStatus('disconnected');

    if (this.autoReconnect) {
      this.tryDebouncedReconnect();
    }
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
  public async serverCall<T extends plugins.typedrequestInterfaces.ITypedRequest>(functionNameArg: T['method'], dataArg: T['request']): Promise<T['response']> {
    const done = plugins.smartpromise.defer();
    const socketRequest = new SocketRequest<T>(this, {
      side: 'requesting',
      originSocketConnection: this.socketConnection,
      shortId: plugins.smartunique.shortId(),
      funcCallData: {
        funcName: functionNameArg,
        funcDataArg: dataArg
      }
    });
    const response = await socketRequest.dispatch();
    const result = response.funcDataArg;
    return result;
  }

  private updateStatus (statusArg: interfaces.TConnectionStatus) {
    if (this.eventStatus !== statusArg) {
      this.eventSubject.next(statusArg);
    }
    this.eventStatus = statusArg;
  }
}
