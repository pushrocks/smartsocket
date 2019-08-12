import * as plugins from './smartsocket.plugins';

import { SocketConnection } from './smartsocket.classes.socketconnection';
import { ISocketFunctionCall, SocketFunction } from './smartsocket.classes.socketfunction';
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
  public role: string;
  public socketConnection: SocketConnection;
  public serverUrl: string;
  public serverPort: number;
  public serverPassword: string;

  public socketFunctions = new plugins.lik.Objectmap<SocketFunction>();
  public socketRequests = new plugins.lik.Objectmap<SocketRequest>();
  public socketRoles = new plugins.lik.Objectmap<SocketRole>();

  constructor(optionsArg: ISmartsocketClientOptions) {
    this.alias = optionsArg.alias;
    this.role = optionsArg.role;
    this.serverUrl = optionsArg.url;
    this.serverPort = optionsArg.port;
    this.serverPassword = optionsArg.password;
  }

  public addSocketFunction(socketFunction: SocketFunction) {
    this.socketFunctions.add(socketFunction);
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
      role: undefined,
      side: 'client',
      smartsocketHost: this,
      socket: plugins.socketIoClient(socketUrl, { multiplex: false })
    });
    this.socketConnection.socket.on('requestAuth', () => {
      console.log('server requested authentication');
      this.socketConnection.socket.emit('dataAuth', {
        role: this.role,
        password: this.serverPassword,
        alias: this.alias
      });
      this.socketConnection.socket.on('authenticated', () => {
        console.log('client is authenticated');
        this.socketConnection.authenticated = true;
        this.socketConnection.listenToFunctionRequests();
        done.resolve();
      });
    });
    return done.promise;
  }

  public disconnect() {
    const done = plugins.smartpromise.defer();
    this.socketConnection.socket.disconnect();
    this.socketConnection = undefined;
    plugins.smartlog.defaultLogger.log('ok', 'disconnected!');
    done.resolve();
    return done.promise;
  }

  public serverCall(functionNameArg: string, dataArg: any) {
    const done = plugins.smartpromise.defer();
    const socketRequest = new SocketRequest(this, {
      side: 'requesting',
      originSocketConnection: this.socketConnection,
      shortId: plugins.shortid.generate(),
      funcCallData: {
        funcName: functionNameArg,
        funcDataArg: dataArg
      }
    });
    socketRequest.dispatch().then((dataArg2: ISocketFunctionCall) => {
      done.resolve(dataArg2.funcDataArg);
    });
    return done.promise;
  }
}
