import * as plugins from './smartsocket.plugins';
import * as interfaces from './interfaces';

// import classes
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SocketFunction } from './smartsocket.classes.socketfunction';
import { SocketRequest, ISocketRequestDataObject } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';

// socket.io
import * as SocketIO from 'socket.io';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';
import { logger } from './smartsocket.logging';

// export interfaces

/**
 * defines is a SocketConnection is server or client side. Important for mesh setups.
 */
export type TSocketConnectionSide = 'server' | 'client';

/**
 * interface for constructor of class SocketConnection
 */
export interface ISocketConnectionConstructorOptions {
  alias: string;
  authenticated: boolean;
  role: SocketRole;
  side: TSocketConnectionSide;
  smartsocketHost: Smartsocket | SmartsocketClient;
  socket: SocketIO.Socket | SocketIOClient.Socket;
}

/**
 * interface for authentication data
 */
export interface ISocketConnectionAuthenticationObject {
  role: 'coreflowContainer';
  password: 'somePassword';
  alias: 'coreflow1';
}

// export classes
export let allSocketConnections = new plugins.lik.ObjectMap<SocketConnection>();

/**
 * class SocketConnection represents a websocket connection
 */
export class SocketConnection {
  public alias: string;
  public side: TSocketConnectionSide;
  public authenticated: boolean = false;
  public role: SocketRole;
  public smartsocketRef: Smartsocket | SmartsocketClient;
  public socket: SocketIO.Socket | SocketIOClient.Socket;

  public eventSubject = new plugins.smartrx.rxjs.Subject<interfaces.TConnectionStatus>();
  public eventStatus: interfaces.TConnectionStatus = 'new';

  private tagStore: interfaces.TTagStore = {};
  public tagStoreObservable = new plugins.smartrx.rxjs.Subject<interfaces.TTagStore>();
  public remoteTagStoreObservable = new plugins.smartrx.rxjs.Subject<interfaces.TTagStore>();

  constructor(optionsArg: ISocketConnectionConstructorOptions) {
    this.alias = optionsArg.alias;
    this.authenticated = optionsArg.authenticated;
    this.role = optionsArg.role;
    this.side = optionsArg.side;
    this.smartsocketRef = optionsArg.smartsocketHost;
    this.socket = optionsArg.socket;

    // standard behaviour that is always true
    allSocketConnections.add(this);

    // handle connection
    this.socket.on('connect', async () => {
      this.updateStatus('connected');
    });
    this.socket.on('disconnect', async () => {
      logger.log(
        'info',
        `SocketConnection with >alias ${this.alias} on >side ${this.side} disconnected`
      );
      await this.disconnect();
      allSocketConnections.remove(this);
      this.eventSubject.next('disconnected');
    });
  }

  /**
   * adds a tag to a connection
   */
  public async addTag(tagArg: interfaces.ITag) {
    const done = plugins.smartpromise.defer();
    this.tagStore[tagArg.id] = tagArg;
    this.tagStoreObservable.next(this.tagStore);
    const remoteSubscription = this.remoteTagStoreObservable.subscribe((remoteTagStore) => {
      const localTagString = plugins.smartjson.stringify(tagArg);
      const remoteTagString = plugins.smartjson.stringify(remoteTagStore[tagArg.id]);
      if (localTagString === remoteTagString) {
        remoteSubscription.unsubscribe();
        done.resolve();
      }
    });
    this.socket.emit('updateTagStore', this.tagStore);
    await done.promise;
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
    delete this.tagStore[tagIdArg];
    this.tagStoreObservable.next(this.tagStore);
    this.socket.emit('updateTagStore', this.tagStore);
  }

  // authenticating --------------------------

  /**
   * authenticate the socket
   */
  public authenticate() {
    const done = plugins.smartpromise.defer();
    this.socket.on('dataAuth', async (dataArg: ISocketConnectionAuthenticationObject) => {
      logger.log('info', 'received authentication data. now hashing and comparing...');
      this.socket.removeAllListeners('dataAuth');
      if (await SocketRole.checkPasswordForRole(dataArg, this.smartsocketRef)) {
        // TODO: authenticate password
        this.alias = dataArg.alias;
        this.authenticated = true;
        this.role = SocketRole.getSocketRoleByName(this.smartsocketRef, dataArg.role);
        this.socket.emit('authenticated');
        logger.log('ok', `socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`);
        done.resolve(this);
      } else {
        this.authenticated = false;
        await this.disconnect();
        done.reject('not authenticated');
      }
    });
    const requestAuthPayload: interfaces.IRequestAuthPayload = {
      serverShortId: this.smartsocketRef.shortId,
    };
    this.socket.emit('requestAuth', requestAuthPayload);
    return done.promise;
  }

  // listening -------------------------------

  /**
   * listen to function requests
   */
  public listenToFunctionRequests() {
    const done = plugins.smartpromise.defer();
    if (this.authenticated) {
      this.socket.on('function', (dataArg: ISocketRequestDataObject<any>) => {
        // check if requested function is available to the socket's scope
        // logger.log('info', 'function request received');
        const referencedFunction: SocketFunction<any> = this.role.allowedFunctions.find(
          (socketFunctionArg) => {
            return socketFunctionArg.name === dataArg.funcCallData.funcName;
          }
        );
        if (referencedFunction) {
          // logger.log('ok', 'function in access scope');
          const localSocketRequest = new SocketRequest(this.smartsocketRef, {
            side: 'responding',
            originSocketConnection: this,
            shortId: dataArg.shortId,
            funcCallData: dataArg.funcCallData,
          });
          localSocketRequest.createResponse(); // takes care of creating response and sending it back
        } else {
          logger.log('warn', 'function not existent or out of access scope');
        }
      });
      this.socket.on('functionResponse', (dataArg: ISocketRequestDataObject<any>) => {
        // logger.log('info', `received response for request with id ${dataArg.shortId}`);
        const targetSocketRequest = SocketRequest.getSocketRequestById(
          this.smartsocketRef,
          dataArg.shortId
        );
        targetSocketRequest.handleResponse(dataArg);
      });

      this.socket.on('updateTagStore', async (tagStoreArg: interfaces.TTagStore) => {
        if (!plugins.smartjson.deepEqualObjects(this.tagStore, tagStoreArg)) {
          this.tagStore = tagStoreArg;
          this.socket.emit('updateTagStore', this.tagStore);
          this.tagStoreObservable.next(this.tagStore);
        }
        this.remoteTagStoreObservable.next(tagStoreArg);
      });

      logger.log('info', `now listening to function requests for ${this.alias}`);
      done.resolve(this);
    } else {
      const errMessage = 'socket needs to be authenticated first';
      logger.log('error', errMessage);
      done.reject(errMessage);
    }
    return done.promise;
  }

  // disconnecting ----------------------
  public async disconnect() {
    this.socket.disconnect(true);
    this.updateStatus('disconnected');
  }

  private updateStatus(statusArg: interfaces.TConnectionStatus) {
    if (this.eventStatus !== statusArg) {
      this.eventSubject.next(statusArg);
    }
    this.eventStatus = statusArg;
  }
}
