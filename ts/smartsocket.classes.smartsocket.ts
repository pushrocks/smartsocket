import * as plugins from "./smartsocket.plugins";
import * as helpers from "./smartsocket.helpers";

// classes
import { Objectmap } from "lik";

export interface ISocketObject {
    group?:string,
    socket: SocketIO.Socket,
    authenticated: boolean
};

export interface ISmartsocketConstructorOptions {
    port: number;

}

export class Smartsocket {
    io: SocketIO.Server;
    openSockets = new Objectmap();
    constructor(options: ISmartsocketConstructorOptions) {
        this.io = plugins.socketIo(options.port);
        this.io.on('connection', this._handleSocket);
    };

    /**
     * the standard handler for new socket connections
     */
    private _handleSocket(socket) {
        let socketObject: ISocketObject = {
            socket: socket,
            authenticated: false
        };
        this.openSockets.add(socketObject);
        helpers.authenticateSocket(socketObject)
            .then();
    }

    registerGroup(string){
        
    }

    closeServer = () => {
        this.io.close();
        this.openSockets.forEach((socketObjectArg: ISocketObject) => {
            socketObjectArg.socket.disconnect();
        });
        this.openSockets.wipe();
    }
}