import { SocketConnection } from './smartsocket.classes.socketconnection';
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
    alias: string;
    role: string;
    password: string;
}
export declare class SmartsocketClient {
    alias: string;
    role: string;
    socketConnection: SocketConnection;
    serverUrl: string;
    serverPort: number;
    serverPassword: string;
    constructor(optionsArg: ISmartsocketClientOptions);
    /**
     * connect the client to the server
     */
    connect(): Promise<{}>;
    disconnect(): Promise<{}>;
    serverCall(functionNameArg: string, dataArg: any): Promise<{}>;
}
