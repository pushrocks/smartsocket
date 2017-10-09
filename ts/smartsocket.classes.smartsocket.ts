import * as plugins from './smartsocket.plugins'
import * as helpers from './smartsocket.helpers'

// classes
import { Objectmap } from 'lik'
import { SocketFunction, ISocketFunctionCall } from './smartsocket.classes.socketfunction'
import { SocketConnection } from './smartsocket.classes.socketconnection'
import { SocketRequest } from './smartsocket.classes.socketrequest'
import { SocketRole } from './smartsocket.classes.socketrole'

export interface ISmartsocketConstructorOptions {
  port: number
}

export class Smartsocket {
  options: ISmartsocketConstructorOptions
  io: SocketIO.Server
  openSockets = new Objectmap<SocketConnection>()
  socketRoles = new Objectmap<SocketRole>()
  constructor (optionsArg: ISmartsocketConstructorOptions) {
    this.options = optionsArg
  }

  /**
   * starts listening to incoming sockets:
   */
  async startServer () {
    this.io = plugins.socketIo(this.options.port)
    this.io.on('connection', (socketArg) => {
      this._handleSocketConnection(socketArg)
    })
  }

  /**
   * starts the server with another server
   */
  async startWithSpecificServer() {
    
  }

  /**
   * closes the server
   */
  async closeServer () {
    await plugins.smartdelay.delayFor(1000)
    this.openSockets.forEach((socketObjectArg: SocketConnection) => {
      plugins.beautylog.log(`disconnect socket with >>alias ${socketObjectArg.alias}`)
      socketObjectArg.socket.disconnect()
    })
    this.openSockets.wipe()
    this.io.close()
  }

  // communication

  /**
   * allows call to specific client.
   */
  clientCall (functionNameArg: string, dataArg: any, targetSocketConnectionArg: SocketConnection) {
    let done = plugins.smartq.defer()
    let socketRequest = new SocketRequest({
      side: 'requesting',
      originSocketConnection: targetSocketConnectionArg,
      shortId: plugins.shortid.generate(),
      funcCallData: {
        funcName: functionNameArg,
        funcDataArg: dataArg
      }
    })
    socketRequest.dispatch()
      .then((dataArg: ISocketFunctionCall) => {
        done.resolve(dataArg.funcDataArg)
      })
    return done.promise
  }

  /**
   * adds socketRoles
   */
  addSocketRoles (socketRolesArray: SocketRole[]): void {
    for (let socketRole of socketRolesArray) {
      this.socketRoles.add(socketRole)
    }
    return
  }

  /**
   * the standard handler for new socket connections
   */
  private _handleSocketConnection (socketArg) {
    let socketConnection: SocketConnection = new SocketConnection({
      alias: undefined,
      authenticated: false,
      role: undefined,
      side: 'server',
      smartsocketHost: this,
      socket: socketArg
    })
    plugins.beautylog.log('Socket connected. Trying to authenticate...')
    this.openSockets.add(socketConnection)
    socketConnection.authenticate()
      .then(() => {
        return socketConnection.listenToFunctionRequests()
      })
      .catch((err) => {
        console.log(err)
      })
  }

}
