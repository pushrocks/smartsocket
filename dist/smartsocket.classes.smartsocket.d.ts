/// <reference types="socket.io" />
/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { Objectmap } from "lik";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
import { SocketRole } from "./smartsocket.classes.socketrole";
export interface ISmartsocketConstructorOptions {
    port: number;
}
export declare class Smartsocket {
    options: ISmartsocketConstructorOptions;
    io: SocketIO.Server;
    openSockets: Objectmap<SocketConnection>;
    socketRoles: Objectmap<SocketRole>;
    constructor(optionsArg: ISmartsocketConstructorOptions);
    /**
     * the standard handler for new socket connections
     */
    private _handleSocketConnection(socketArg);
    /**
     * starts listening to incling sockets:
     */
    startServer: () => void;
    closeServer: () => void;
    /**
     * allows call to specific client.
     */
    clientCall(functionNameArg: string, dataArg: any, targetSocketConnectionArg: SocketConnection): plugins.q.Promise<{}>;
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray: SocketRole[]): void;
}
