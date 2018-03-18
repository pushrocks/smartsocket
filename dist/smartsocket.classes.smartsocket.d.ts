/// <reference types="node" />
/// <reference types="socket.io" />
import * as plugins from './smartsocket.plugins';
import * as http from 'http';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { SocketRole } from './smartsocket.classes.socketrole';
import * as SocketIO from 'socket.io';
export interface ISmartsocketConstructorOptions {
    port: number;
}
export declare class Smartsocket {
    options: ISmartsocketConstructorOptions;
    httpServer: http.Server;
    io: SocketIO.Server;
    openSockets: plugins.lik.Objectmap<SocketConnection>;
    socketRoles: plugins.lik.Objectmap<SocketRole>;
    constructor(optionsArg: ISmartsocketConstructorOptions);
    /**
     * starts listening to incoming sockets:
     */
    startServer(): Promise<{}>;
    /**
     * starts the server with another server
     * also works with an express style server
     */
    setServer(httpServerArg: http.Server): Promise<void>;
    /**
     * closes the server
     */
    closeServer(): Promise<void>;
    /**
     * allows call to specific client.
     */
    clientCall(functionNameArg: string, dataArg: any, targetSocketConnectionArg: SocketConnection): Promise<{}>;
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray: SocketRole[]): void;
    /**
     * the standard handler for new socket connections
     */
    private _handleSocketConnection(socketArg);
}
