import * as plugins from "./smartsocket.plugins";
import * as helpers from "./smartsocket.helpers";

// classes
import { Objectmap } from "lik";
import { SocketRole } from "./smartsocket.classes.socketrole";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";

export interface ISmartsocketConstructorOptions {
    port: number;

};

export class Smartsocket {
    options: ISmartsocketConstructorOptions
    io: SocketIO.Server;
    openSockets = new Objectmap<SocketConnection>();
    constructor(optionsArg: ISmartsocketConstructorOptions) {
        this.options = optionsArg;
    };

    /**
     * the standard handler for new socket connections
     */
    private _handleSocketConnection(socketArg) {
        let socketConnection: SocketConnection =  new SocketConnection({
            alias:undefined,
            authenticated:false,
            role:undefined,
            socket:socketArg
        });
        plugins.beautylog.log("Socket connected. Trying to authenticate...")
        this.openSockets.add(socketConnection);
        socketConnection.authenticate()
            .then(socketConnection.listenToFunctionRequests);
    };

    /**
     * starts listening to incling sockets:
     */

    startServer = () => {
        this.io = plugins.socketIo(this.options.port);
        this.io.on("connection", (socketArg) => {
            this._handleSocketConnection(socketArg);
        });
    }
    closeServer = () => {
        this.openSockets.forEach((socketObjectArg: SocketConnection) => {
            plugins.beautylog.log(`disconnect socket with >>alias ${socketObjectArg.alias}`);
            socketObjectArg.socket.disconnect();
        });
        this.openSockets.wipe();
        this.io.close();
    };

    // communication
    clientCall(){
        // TODO: target specific client and initiate response        
    }
}