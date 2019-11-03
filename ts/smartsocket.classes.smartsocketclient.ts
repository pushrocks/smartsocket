import * as plugins from './smartsocket.plugins';

import { SocketConnection } from './smartsocket.classes.socketconnection';
import { ISocketFunctionCallDataRequest, SocketFunction } from './smartsocket.classes.socketfunction';
import { ISocketRequestDataObject, SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';

/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
  port: number;
  url: string;
  alias: string; // an alias makes it easier to identify this client in a multo client environment
  role: string;
  password: string; // by setting a password access to functions can be limited
}

export class SmartsocketClient {
  public alias: string;
  public socketRole: SocketRole;
  public socketConnection: SocketConnection;
  public serverUrl: string;
  public serverPort: number;

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
      socket: plugins.socketIoClient(socketUrl, { multiplex: false })
    });
    this.socketConnection.socket.on('requestAuth', () => {
      plugins.smartlog.defaultLogger.log('info', 'server requested authentication');
      this.socketConnection.socket.emit('dataAuth', {
        role: this.socketRole.name,
        password: this.socketRole.passwordHash,
        alias: this.alias
      });
      this.socketConnection.socket.on('authenticated', () => {
        plugins.smartlog.defaultLogger.log('info', 'client is authenticated');
        this.socketConnection.authenticated = true;
        this.socketConnection.listenToFunctionRequests();
        done.resolve();
      });

      // handle errors
      this.socketConnection.socket.on('reconnect_failed', async () => {
        this.disconnect();
      });
      this.socketConnection.socket.on('connect_error', async () => {
        this.disconnect();
      });
    });
    return done.promise;
  }

  /**
   * disconnect from the server
   */
  public async disconnect() {
    if (this.socketConnection) {
      this.socketConnection.socket.disconnect(true);
      this.socketConnection = undefined;
      plugins.smartlog.defaultLogger.log('ok', 'disconnected!');
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
      shortId: plugins.shortid.generate(),
      funcCallData: {
        funcName: functionNameArg,
        funcDataArg: dataArg
      }
    });
    const response = await socketRequest.dispatch();
    const result = response.funcDataArg;
    return result;
  }
}
