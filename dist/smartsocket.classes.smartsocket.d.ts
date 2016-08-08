/// <reference types="socket.io" />
import { Objectmap } from "lik";
import { SocketRole } from "./smartsocket.classes.socketrole";
export interface ISmartsocketConstructorOptions {
    port: number;
}
export declare class Smartsocket {
    options: ISmartsocketConstructorOptions;
    io: SocketIO.Server;
    openSockets: Objectmap;
    registeredFunctions: Objectmap;
    constructor(optionsArg: ISmartsocketConstructorOptions);
    /**
     * the standard handler for new socket connections
     */
    private _handleSocket(socketArg);
    registerFunction(socketRoleArg: SocketRole): void;
    /**
     * starts listening to incling sockets:
     */
    startServer: () => void;
    closeServer: () => void;
}
