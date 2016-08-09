import { ISocketFunctionCall } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
}
export declare class SmartsocketClient {
    socketConnection: SocketConnection;
    constructor(optionsArg: ISmartsocketClientOptions);
    serverCall(functionNameArg: string, dataArg: ISocketFunctionCall): void;
}
