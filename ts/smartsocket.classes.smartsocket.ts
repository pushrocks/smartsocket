import * as plugins from "./smartsocket.plugins";
import * as helpers from "./smartsocket.helpers";

// classes
import { Objectmap } from "lik";
import {SocketRole} from "./smartsocket.classes.socketrole";
import {SocketFunction} from "./smartsocket.classes.socketfunction";


export interface ISocketObject {
    alias?:string;
    authenticated: boolean
    role?:string,
    socket: SocketIO.Socket,
};

export interface ISmartsocketConstructorOptions {
    port: number;

};

export class Smartsocket {
    options:ISmartsocketConstructorOptions
    io: SocketIO.Server;
    openSockets = new Objectmap();
    registeredRoles = new Objectmap();
    constructor(optionsArg: ISmartsocketConstructorOptions) {
        this.options = optionsArg;
    };

    /**
     * the standard handler for new socket connections
     */
    private _handleSocket(socket) {
        let socketObject: ISocketObject = {
            socket: socket,
            authenticated: false
        };
        plugins.beautylog.log("Socket connected. Trying to authenticate...")
        this.openSockets.add(socketObject);
        helpers.authenticateSocket(socketObject)
            .then();
    }

    registerFunctions(socketRoleArg:SocketRole){
        this.registeredRoles.add(socketRoleArg);
    };


    /**
     * starts listening to incling sockets:
     */

    startServer = () => {
        this.io = plugins.socketIo(this.options.port);
        this.io.on('connection', (socketArg) => {
            this._handleSocket(socketArg);
        });
    }
    closeServer = () => {
        this.openSockets.forEach((socketObjectArg: ISocketObject) => {
            plugins.beautylog.log(`disconnect socket with >>alias ${socketObjectArg.alias}`);
            socketObjectArg.socket.disconnect();
        });
        this.openSockets.wipe();
        this.io.close();
    }
}