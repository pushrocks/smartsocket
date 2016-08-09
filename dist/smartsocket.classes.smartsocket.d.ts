/// <reference types="socket.io" />
import { Objectmap } from "lik";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
export interface ISmartsocketConstructorOptions {
    port: number;
}
export declare class Smartsocket {
    options: ISmartsocketConstructorOptions;
    io: SocketIO.Server;
    openSockets: Objectmap<SocketConnection>;
    constructor(optionsArg: ISmartsocketConstructorOptions);
    /**
     * the standard handler for new socket connections
     */
    private _handleSocket(socketArg);
    /**
     * starts listening to incling sockets:
     */
    startServer: () => void;
    closeServer: () => void;
}
