/// <reference types="socket.io-client" />
import * as plugins from './smartsocket.plugins';
import * as interfaces from './interfaces';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SocketRole } from './smartsocket.classes.socketrole';
import * as SocketIO from 'socket.io';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';
/**
 * defines is a SocketConnection is server or client side. Important for mesh setups.
 */
export declare type TSocketConnectionSide = 'server' | 'client';
/**
 * interface for constructor of class SocketConnection
 */
export interface ISocketConnectionConstructorOptions {
    alias: string;
    authenticated: boolean;
    role: SocketRole;
    side: TSocketConnectionSide;
    smartsocketHost: Smartsocket | SmartsocketClient;
    socket: SocketIO.Socket | SocketIOClient.Socket;
}
/**
 * interface for authentication data
 */
export interface ISocketConnectionAuthenticationObject {
    role: 'coreflowContainer';
    password: 'somePassword';
    alias: 'coreflow1';
}
export declare let allSocketConnections: plugins.lik.ObjectMap<SocketConnection>;
/**
 * class SocketConnection represents a websocket connection
 */
export declare class SocketConnection {
    alias: string;
    side: TSocketConnectionSide;
    authenticated: boolean;
    role: SocketRole;
    smartsocketRef: Smartsocket | SmartsocketClient;
    socket: SocketIO.Socket | SocketIOClient.Socket;
    eventSubject: plugins.smartrx.rxjs.Subject<interfaces.TConnectionStatus>;
    eventStatus: interfaces.TConnectionStatus;
    constructor(optionsArg: ISocketConnectionConstructorOptions);
    /**
     * authenticate the socket
     */
    authenticate(): Promise<unknown>;
    /**
     * listen to function requests
     */
    listenToFunctionRequests(): Promise<unknown>;
    disconnect(): Promise<void>;
    private updateStatus;
}
