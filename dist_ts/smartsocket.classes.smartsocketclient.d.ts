import * as plugins from './smartsocket.plugins';
import * as interfaces from './interfaces';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { SocketFunction } from './smartsocket.classes.socketfunction';
import { SocketRequest } from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
    alias: string;
    role: string;
    password: string;
    autoReconnect?: boolean;
}
export declare class SmartsocketClient {
    shortId: string;
    remoteShortId: string;
    alias: string;
    socketRole: SocketRole;
    socketConnection: SocketConnection;
    serverUrl: string;
    serverPort: number;
    autoReconnect: boolean;
    eventSubject: plugins.smartrx.rxjs.Subject<interfaces.TConnectionStatus>;
    eventStatus: interfaces.TConnectionStatus;
    socketFunctions: plugins.lik.ObjectMap<SocketFunction<any>>;
    socketRequests: plugins.lik.ObjectMap<SocketRequest<any>>;
    socketRoles: plugins.lik.ObjectMap<SocketRole>;
    constructor(optionsArg: ISmartsocketClientOptions);
    addSocketFunction(socketFunction: SocketFunction<any>): void;
    /**
     * connect the client to the server
     */
    connect(): Promise<unknown>;
    /**
     * disconnect from the server
     */
    disconnect(): Promise<void>;
    /**
     * try a reconnection
     */
    tryDebouncedReconnect(): Promise<void>;
    /**
     * dispatches a server call
     * @param functionNameArg
     * @param dataArg
     */
    serverCall<T extends plugins.typedrequestInterfaces.ITypedRequest>(functionNameArg: T['method'], dataArg: T['request']): Promise<T['response']>;
    private updateStatus;
}
