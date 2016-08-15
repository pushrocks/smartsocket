/// <reference types="socket.io" />
/// <reference types="socket.io-client" />
/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { Objectmap } from "lik";
import { SocketRole } from "./smartsocket.classes.socketrole";
/**
 * defines is a SocketConnection is server or client side. Important for mesh setups.
 */
export declare type TSocketConnectionSide = "server" | "client";
/**
 * interface for constructor of class SocketConnection
 */
export interface ISocketConnectionConstructorOptions {
    alias: string;
    authenticated: boolean;
    role: SocketRole;
    side: TSocketConnectionSide;
    socket: SocketIO.Socket | SocketIOClient.Socket;
}
/**
 * interface for authentication data
 */
export interface ISocketConnectionAuthenticationObject {
    role: "coreflowContainer";
    password: "somePassword";
    alias: "coreflow1";
}
export declare let allSocketConnections: Objectmap<SocketConnection>;
/**
 * class SocketConnection represents a websocket connection
 */
export declare class SocketConnection {
    alias: string;
    side: TSocketConnectionSide;
    authenticated: boolean;
    role: SocketRole;
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
