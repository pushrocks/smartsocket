/// <reference types="socket.io" />
export interface ISocketConnectionOptions {
    alias?: string;
    authenticated: boolean;
    role?: string;
    socket: SocketIO.Socket;
}
export declare class SocketConnection {
    alias?: string;
    authenticated: boolean;
    role?: string;
    socket: SocketIO.Socket;
    constructor(optionsArg: ISocketConnectionOptions);
}
