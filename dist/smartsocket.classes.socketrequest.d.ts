/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { ISocketFunctionCall } from "./smartsocket.classes.socketfunction";
import { Objectmap } from "lik";
import { SocketConnection } from "./smartsocket.classes.socketconnection";
export declare type TSocketRequestStatus = "new" | "pending" | "finished";
export declare type TSocketRequestSide = "requesting" | "responding";
/**
 * interface of constructor of class SocketRequest
 */
export interface SocketRequestConstructorOptions {
    side: TSocketRequestSide;
    originSocketConnection: SocketConnection;
    shortId: string;
    funcCallData?: ISocketFunctionCall;
}
/**
 * request object that is sent initially and may or may not receive a response
 */
export interface ISocketRequestDataObject {
    funcCallData: ISocketFunctionCall;
    shortId: string;
    responseTimeout?: number;
}
export declare let allRequestingSocketRequests: Objectmap<SocketRequest>;
export declare let allRespondingSocketRequests: Objectmap<SocketRequest>;
export declare class SocketRequest {
    status: TSocketRequestStatus;
    side: TSocketRequestSide;
    shortid: string;
    originSocketConnection: SocketConnection;
    requestData: ISocketRequestDataObject;
    done: plugins.q.Deferred<{}>;
    constructor(optionsArg: SocketRequestConstructorOptions);
    dispatch(): plugins.q.Promise<{}>;
    handleResponse(responseDataArg: ISocketRequestDataObject): void;
    respond(dataArg: any): void;
}
