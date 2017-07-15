/// <reference types="socket.io" />
import { Objectmap } from 'lik';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { SocketRole } from './smartsocket.classes.socketrole';
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
     * starts listening to incoming sockets:
     */
    startServer(): Promise<void>;
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
