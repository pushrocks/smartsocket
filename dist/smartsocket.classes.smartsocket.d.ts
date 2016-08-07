/// <reference types="socket.io" />
/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { Objectmap } from "lik";
export interface ISocketObject {
    socket: SocketIO.Socket;
    authenticated: boolean;
}
export interface ISmartsocketConstructorOptions {
    port: number;
}
export declare class Smartsocket {
    io: SocketIO.Server;
    openSockets: Objectmap;
    constructor(options: ISmartsocketConstructorOptions);
    startListening: any;
    authenticateSocket(socketObjectArg: ISocketObject): plugins.q.Promise<{}>;
    closeServer: () => void;
}
