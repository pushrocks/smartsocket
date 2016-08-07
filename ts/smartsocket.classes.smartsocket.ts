import * as plugins from "./smartsocket.plugins";
import * as helpers from "./smartsocket.helpers";

// classes
import { Objectmap } from "lik";
import {SocketRole} from "./smartsocket.classes.socketrole";
import {SocketFunction} from "./smartsocket.classes.socketfunction";


export interface ISocketObject {
    group?:string,
    socket: SocketIO.Socket,
    authenticated: boolean
};

export interface ISmartsocketConstructorOptions {
    port: number;

};

export class Smartsocket {
    io: SocketIO.Server;
    openSockets = new Objectmap();
    registeredRoles = new Objectmap();
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

    registerRole(socketRoleArg:SocketRole){
        this.registeredRoles.add(socketRoleArg);
    };



    closeServer = () => {
        this.io.close();
        this.openSockets.forEach((socketObjectArg: ISocketObject) => {
            socketObjectArg.socket.disconnect();
        });
        this.openSockets.wipe();
    }
}