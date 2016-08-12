/// <reference types="socket.io" />
/// <reference types="socket.io-client" />
/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { SocketRole } from "./smartsocket.classes.socketrole";
/**
 * interface for constructor of class SocketConnection
 */
export interface ISocketConnectionConstructorOptions {
    alias?: string;
    authenticated: boolean;
    role?: SocketRole;
    socket?: SocketIO.Socket | SocketIOClient.Socket;
}
/**
 * interface for authentication data
 */
export interface ISocketConnectionAuthenticationObject {
    role: "coreflowContainer";
    password: "somePassword";
    alias: "coreflow1";
}
/**
 * class SocketConnection represents a websocket connection
 */
export declare class SocketConnection {
    alias?: string;
    authenticated: boolean;
    role?: SocketRole;
    socket: SocketIO.Socket | SocketIOClient.Socket;
    constructor(optionsArg: ISocketConnectionConstructorOptions);
    /**
     * authenticate the socket
     */
    authenticate(): plugins.q.Promise<{}>;
    /**
     * listen to function requests
     */
    listenToFunctionRequests(): plugins.q.Promise<{}>;
}
