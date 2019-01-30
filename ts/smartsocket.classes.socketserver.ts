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
  public async setExternalServer(serverType: 'express' | 'http', serverArg: any) {
    if (serverType === 'http') {
      this.httpServer = serverArg;
    } else if (serverType === 'express') {
      this.expressServer = serverArg;
    }
  }

  /**
   * gets the server for socket.io
   */
  public getServerForSocketIo() {
    if (this.httpServer) {
      return this.httpServer;
    } else if (this.expressServer) {
      return this.expressServer;
    } else if (!this.httpServer && !this.expressServer) {
      this.httpServer = new http.Server();
      this.standaloneServer = true;
      return this.httpServer;
    } else {
      throw new Error('no server specified!');
    }
  }

  /**
   * starts listening to incoming sockets:
   */
  public async start() {
    const done = plugins.smartpromise.defer();

    // handle http servers
    if (this.httpServer && this.standaloneServer) {
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