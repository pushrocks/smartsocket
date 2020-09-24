import * as plugins from './smartsocket.plugins';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { SocketFunction } from './smartsocket.classes.socketfunction';
import { SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';
import * as SocketIO from 'socket.io';
export interface ISmartsocketConstructorOptions {
    port?: number;
}
export declare class Smartsocket {
    /**
     * a unique id to detect server restarts
     */
    shortId: string;
    options: ISmartsocketConstructorOptions;
    io: SocketIO.Server;
    socketConnections: plugins.lik.ObjectMap<SocketConnection>;
    socketRoles: plugins.lik.ObjectMap<SocketRole>;
    socketFunctions: plugins.lik.ObjectMap<SocketFunction<any>>;
    socketRequests: plugins.lik.ObjectMap<SocketRequest<any>>;
    private socketServer;
    constructor(optionsArg: ISmartsocketConstructorOptions);
    setExternalServer(serverType: 'smartexpress', serverArg: any): Promise<void>;
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
    clientCall<T extends plugins.typedrequestInterfaces.ITypedRequest>(functionNameArg: T['method'], dataArg: T['request'], targetSocketConnectionArg: SocketConnection): Promise<T['response']>;
    /**
     * adds socketRoles
     */
    addSocketRoles(socketRolesArray: SocketRole[]): void;
    addSocketFunction(socketFunction: SocketFunction<any>): void;
    /**
     * the standard handler for new socket connections
     */
    private _handleSocketConnection;
}
