import * as plugins from './smartsocket.plugins';
import * as pluginsTyped from './smartsocket.pluginstyped';

// classes
import { SocketConnection } from './smartsocket.classes.socketconnection';
import {
  ISocketFunctionCallDataRequest,
  SocketFunction,
  ISocketFunctionCallDataResponse,
} from './smartsocket.classes.socketfunction';
import { SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';
import { SocketServer } from './smartsocket.classes.socketserver';

import { logger } from './smartsocket.logging';

export interface ISmartsocketConstructorOptions {
  port?: number;
}

export class Smartsocket {
  /**
   * a unique id to detect server restarts
   */
  public shortId = plugins.isounique.uni();
  public smartenv = new plugins.smartenv.Smartenv();
  public options: ISmartsocketConstructorOptions;
  public io: pluginsTyped.socketIo.Server;
  public socketConnections = new plugins.lik.ObjectMap<SocketConnection>();
  public socketRoles = new plugins.lik.ObjectMap<SocketRole>();
  public socketFunctions = new plugins.lik.ObjectMap<SocketFunction<any>>();
  public socketRequests = new plugins.lik.ObjectMap<SocketRequest<any>>();

  private socketServer = new SocketServer(this);

  constructor(optionsArg: ISmartsocketConstructorOptions) {
    this.options = optionsArg;
  }

  // tslint:disable-next-line:member-ordering
  public async setExternalServer(serverType: 'smartexpress', serverArg: any) {
    await this.socketServer.setExternalServer(serverType, serverArg);
  }

  /**
   * starts smartsocket
   */
  public async start() {
    const socketIoModule = this.smartenv.getSafeNodeModule('socket.io');
    this.io = socketIoModule(this.socketServer.getServerForSocketIo());
    await this.socketServer.start();
    this.io.on('connection', (socketArg) => {
      this._handleSocketConnection(socketArg);
    });
  }

  /**
   * stops smartsocket
   */
  public async stop() {
    await plugins.smartdelay.delayFor(1000);
    this.socketConnections.forEach((socketObjectArg: SocketConnection) => {
      if (socketObjectArg) {
        logger.log('info', `disconnect socket with >>alias ${socketObjectArg.alias}`);
        socketObjectArg.socket.disconnect();
      }
    });
    this.socketConnections.wipe();
    this.io.close();

    // stop the corresponging server
    this.socketServer.stop();
  }

  // communication

  /**
   * allows call to specific client.
   */
  public async clientCall<T extends plugins.typedrequestInterfaces.ITypedRequest>(
    functionNameArg: T['method'],
    dataArg: T['request'],
    targetSocketConnectionArg: SocketConnection
  ): Promise<T['response']> {
    const socketRequest = new SocketRequest<T>(this, {
      funcCallData: {
        funcDataArg: dataArg,
        funcName: functionNameArg,
      },
      originSocketConnection: targetSocketConnectionArg,
      shortId: plugins.isounique.uni(),
      side: 'requesting',
    });
    const response: ISocketFunctionCallDataResponse<T> = await socketRequest.dispatch();
    const result = response.funcDataArg;
    return result;
  }

  /**
   * adds socketRoles
   */
  public addSocketRoles(socketRolesArray: SocketRole[]): void {
    for (const socketRole of socketRolesArray) {
      this.socketRoles.add(socketRole);
    }
    return;
  }

  public addSocketFunction(socketFunction: SocketFunction<any>) {
    this.socketFunctions.add(socketFunction);
  }

  /**
   * the standard handler for new socket connections
   */
  private async _handleSocketConnection(socketArg: pluginsTyped.socketIo.Socket) {
    const socketConnection: SocketConnection = new SocketConnection({
      alias: undefined,
      authenticated: false,
      role: undefined,
      side: 'server',
      smartsocketHost: this,
      socket: socketArg,
    });
    logger.log('info', 'Socket connected. Trying to authenticate...');
    this.socketConnections.add(socketConnection);
    await socketConnection.authenticate();
    await socketConnection.listenToFunctionRequests();
  }
}
