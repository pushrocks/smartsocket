import * as plugins from './smartsocket.plugins';

// classes
import { Objectmap } from '@pushrocks/lik';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { ISocketFunctionCall, SocketFunction } from './smartsocket.classes.socketfunction';
import { SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';
import { SocketServer } from './smartsocket.classes.socketserver';

// socket.io
import * as SocketIO from 'socket.io';

export interface ISmartsocketConstructorOptions {
  port?: number;
}

export class Smartsocket {
  public options: ISmartsocketConstructorOptions;
  public io: SocketIO.Server;
  public socketConnections = new Objectmap<SocketConnection>();
  public socketRoles = new Objectmap<SocketRole>();
  public socketFunctions = new Objectmap<SocketFunction>();
  public socketRequests = new Objectmap<SocketRequest>();

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
    this.io = plugins.socketIo(this.socketServer.getServerForSocketIo());
    await this.socketServer.start();
    this.io.on('connection', socketArg => {
      this._handleSocketConnection(socketArg);
    });
  }

  /**
   * stops smartsocket
   */
  public async stop() {
    await plugins.smartdelay.delayFor(1000);
    this.socketConnections.forEach((socketObjectArg: SocketConnection) => {
      plugins.smartlog.defaultLogger.log(
        'info',
        `disconnect socket with >>alias ${socketObjectArg.alias}`
      );
      socketObjectArg.socket.disconnect();
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
  public async clientCall(
    functionNameArg: string,
    dataArg: any,
    targetSocketConnectionArg: SocketConnection
  ) {
    const socketRequest = new SocketRequest(this, {
      funcCallData: {
        funcDataArg: dataArg,
        funcName: functionNameArg
      },
      originSocketConnection: targetSocketConnectionArg,
      shortId: plugins.shortid.generate(),
      side: 'requesting'
    });
    const response: ISocketFunctionCall = await socketRequest.dispatch();
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

  public addSocketFunction(socketFunction: SocketFunction) {
    this.socketFunctions.add(socketFunction);
  }

  /**
   * the standard handler for new socket connections
   */
  private async _handleSocketConnection(socketArg: plugins.socketIo.Socket) {
    const socketConnection: SocketConnection = new SocketConnection({
      alias: undefined,
      authenticated: false,
      role: undefined,
      side: 'server',
      smartsocketHost: this,
      socket: socketArg
    });
    plugins.smartlog.defaultLogger.log('info', 'Socket connected. Trying to authenticate...');
    this.socketConnections.add(socketConnection);
    await socketConnection.authenticate();
    await socketConnection.listenToFunctionRequests();
  }
}
