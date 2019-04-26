import * as plugins from './smartsocket.plugins';

// used in case no other server is supplied
import * as http from 'http';
import { Smartsocket } from './smartsocket.classes.smartsocket';

/**
 * class socketServer
 * handles the attachment of socketIo to whatever server is in play
 */
export class SocketServer {
  private smartsocket: Smartsocket;
  private httpServer: http.Server;
  // wether httpServer is standalone
  private standaloneServer = false;
  private expressServer: any;

  constructor(smartSocketInstance: Smartsocket) {
    this.smartsocket = smartSocketInstance;
  }

  /**
   * starts the server with another server
   * also works with an express style server
   */
  public async setExternalServer(
    serverType: 'smartexpress',
    serverArg: plugins.smartexpress.Server
  ) {
    await serverArg.startedPromise;
    this.httpServer = serverArg.httpServer;
  }

  /**
   * gets the server for socket.io
   */
  public getServerForSocketIo() {
    if (this.httpServer) {
      return this.httpServer;
    } else {
      this.httpServer = new http.Server();
      this.standaloneServer = true;
      return this.httpServer;
    }
  }

  /**
   * starts listening to incoming sockets:
   */
  public async start() {
    const done = plugins.smartpromise.defer();

    // handle http servers
    // in case an external server has been set "this.standaloneServer" should be false
    if (this.httpServer && this.standaloneServer) {
      if (!this.smartsocket.options.port) {
        console.log('there should be a port specifed for smartsocket!');
        throw new Error('there should be a port specified for smartsocket');
      }
      this.httpServer.listen(this.smartsocket.options.port, () => {
        console.log(`Server started in standalone mode on ${this.smartsocket.options.port}`);
        done.resolve();
      });
    } else {
      done.resolve();
    }

    // nothing else to do if express server is set
    await done.promise;
    return;
  }

  /**
   * closes the server
   */
  public async stop() {}
}
