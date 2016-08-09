/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { ISocketFunctionRequestObject, ISocketFunctionResponseObject } from "./smartsocket.classes.socketfunction";
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
}
export declare class SmartsocketClient {
    constructor();
    dispatchFunctionRequest(dataArg: ISocketFunctionRequestObject): plugins.q.Promise<ISocketFunctionResponseObject>;
}
