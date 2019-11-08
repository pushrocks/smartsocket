import * as plugins from './smartsocket.plugins';
import * as interfaces from './interfaces';

import { Objectmap } from '@pushrocks/lik';

// import classes
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SocketFunction } from './smartsocket.classes.socketfunction';
import { SocketRequest, ISocketRequestDataObject } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';

// socket.io
import * as SocketIO from 'socket.io';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';

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
export let allSocketConnections = new Objectmap<SocketConnection>();

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

  public eventSubject = new plugins.smartrx.rxjs.Subject<interfaces.TConnectionEvent>();

  constructor(optionsArg: ISocketConnectionConstructorOptions) {
    this.alias = optionsArg.alias;
    this.authenticated = optionsArg.authenticated;
    this.role = optionsArg.role;
    this.side = optionsArg.side;
    this.smartsocketRef = optionsArg.smartsocketHost;
    this.socket = optionsArg.socket;

    // standard behaviour that is always true
    allSocketConnections.add(this);
    this.socket.on('disconnect', async () => {
      plugins.smartlog.defaultLogger.log(
        'info',
        `SocketConnection with >alias ${this.alias} on >side ${this.side} disconnected`
      );
      await this.disconnect();
      allSocketConnections.remove(this);
    });
  }

  // authenticating --------------------------

  /**
   * authenticate the socket
   */
  public authenticate() {
    const done = plugins.smartpromise.defer();
    this.socket.on('dataAuth', async (dataArg: ISocketConnectionAuthenticationObject) => {
      plugins.smartlog.defaultLogger.log(
        'info',
        'received authentication data. now hashing and comparing...'
      );
      this.socket.removeListener('dataAuth', () => {});
      if (SocketRole.checkPasswordForRole(dataArg, this.smartsocketRef)) {
        // TODO: authenticate password
        this.alias = dataArg.alias;
        this.authenticated = true;
        this.role = SocketRole.getSocketRoleByName(this.smartsocketRef, dataArg.role);
        this.socket.emit('authenticated');
        plugins.smartlog.defaultLogger.log(
          'ok',
          `socket with >>alias ${this.alias} >>role ${this.role} is authenticated!`
        );
        done.resolve(this);
      } else {
        this.authenticated = false;
        await this.disconnect();
        done.reject('not authenticated');
      }
    });
    const requestAuthPayload: interfaces.IRequestAuthPayload = {
      serverShortId: this.smartsocketRef.shortId
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
        plugins.smartlog.defaultLogger.log('info', 'function request received');
        const referencedFunction: SocketFunction<any> = this.role.allowedFunctions.find(
          socketFunctionArg => {
            return socketFunctionArg.name === dataArg.funcCallData.funcName;
          }
        );
        if (referencedFunction) {
          plugins.smartlog.defaultLogger.log('ok', 'function in access scope');
          const localSocketRequest = new SocketRequest(this.smartsocketRef, {
            side: 'responding',
            originSocketConnection: this,
            shortId: dataArg.shortId,
            funcCallData: dataArg.funcCallData
          });
          localSocketRequest.createResponse(); // takes care of creating response and sending it back
        } else {
          plugins.smartlog.defaultLogger.log(
            'warn',
            'function not existent or out of access scope'
          );
        }
      });
      this.socket.on('functionResponse', (dataArg: ISocketRequestDataObject<any>) => {
        plugins.smartlog.defaultLogger.log(
          'info',
          `received response for request with id ${dataArg.shortId}`
        );
        const targetSocketRequest = SocketRequest.getSocketRequestById(
          this.smartsocketRef,
          dataArg.shortId
        );
        targetSocketRequest.handleResponse(dataArg);
      });
      plugins.smartlog.defaultLogger.log(
        'info',
        `now listening to function requests for ${this.alias}`
      );
      done.resolve(this);
    } else {
      const errMessage = 'socket needs to be authenticated first';
      plugins.smartlog.defaultLogger.log('error', errMessage);
      done.reject(errMessage);
    }
    return done.promise;
  }

  // disconnecting ----------------------
  public async disconnect() {
    this.socket.disconnect(true);
    this.eventSubject.next('terminated');
  }
}
