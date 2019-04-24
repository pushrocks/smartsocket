import * as plugins from './smartsocket.plugins';
import * as helpers from './smartsocket.helpers';

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
  public openSockets = new Objectmap<SocketConnection>();
  public socketRoles = new Objectmap<SocketRole>();

  private socketServer = new SocketServer(this);

  constructor(optionsArg: ISmartsocketConstructorOptions) {
    this.options = optionsArg;
  }

  // tslint:disable-next-line:member-ordering
  public setExternalServer = this.socketServer.setExternalServer;

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
    this.openSockets.forEach((socketObjectArg: SocketConnection) => {
      plugins.smartlog.defaultLogger.log(
        'info',
        `disconnect socket with >>alias ${socketObjectArg.alias}`
      );
      socketObjectArg.socket.disconnect();
    });
    this.openSockets.wipe();
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
    const done = plugins.smartpromise.defer();
    const socketRequest = new SocketRequest({
      funcCallData: {
        funcDataArg: dataArg,
        funcName: functionNameArg
      },
      originSocketConnection: targetSocketConnectionArg,
      shortId: plugins.shortid.generate(),
      side: 'requesting'
    });
    socketRequest.dispatch().then((dataArg: ISocketFunctionCall) => {
      done.resolve(dataArg.funcDataArg);
    });
    const result = await done.promise;
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

  /**
   * the standard handler for new socket connections
   */
  private _handleSocketConnection(socketArg) {
    const socketConnection: SocketConnection = new SocketConnection({
      alias: undefined,
      authenticated: false,
      role: undefined,
      side: 'server',
      smartsocketHost: this,
      socket: socketArg
    });
    plugins.smartlog.defaultLogger.log('info', 'Socket connected. Trying to authenticate...');
    this.openSockets.add(socketConnection);
    socketConnection
      .authenticate()
      .then(() => {
        return socketConnection.listenToFunctionRequests();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
