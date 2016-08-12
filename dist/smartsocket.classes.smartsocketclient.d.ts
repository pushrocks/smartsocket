/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { ISocketFunctionCall } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
    alias?: string;
    password: string;
}
export declare class SmartsocketClient {
    socketConnection: SocketConnection;
    serverUrl: string;
    serverPort: number;
    serverPassword: string;
    constructor(optionsArg: ISmartsocketClientOptions);
    private _handleSocketConnection();
    serverCall(functionNameArg: string, dataArg: ISocketFunctionCall): plugins.q.Promise<{}>;
}
