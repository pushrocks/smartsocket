/// <reference types="socket.io" />
import * as plugins from './smartsocket.plugins';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { SocketRole } from './smartsocket.classes.socketrole';
import * as SocketIO from 'socket.io';
export interface ISmartsocketConstructorOptions {
    port: number;
}
export declare class Smartsocket {
    options: ISmartsocketConstructorOptions;
    io: SocketIO.Server;
    openSockets: plugins.lik.Objectmap<SocketConnection>;
    socketRoles: plugins.lik.Objectmap<SocketRole>;
    private socketServer;
    constructor(optionsArg: ISmartsocketConstructorOptions);
    setExternalServer: (serverType: "express" | "http", serverArg: any) => Promise<void>;
    /**
     * starts smartsocket
     */
    start(): Promise<void>;
    /**
     * stops smartsocket
     */
    stop(): Promise<void>;
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
