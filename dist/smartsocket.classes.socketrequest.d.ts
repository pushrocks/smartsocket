import * as plugins from './smartsocket.plugins';
import { ISocketFunctionCall } from './smartsocket.classes.socketfunction';
import { Objectmap } from 'lik';
import { SocketConnection } from './smartsocket.classes.socketconnection';
export declare type TSocketRequestStatus = 'new' | 'pending' | 'finished';
export declare type TSocketRequestSide = 'requesting' | 'responding';
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
export declare let allSocketRequests: Objectmap<SocketRequest>;
export declare class SocketRequest {
    status: TSocketRequestStatus;
    side: TSocketRequestSide;
    shortid: string;
    originSocketConnection: SocketConnection;
    funcCallData: ISocketFunctionCall;
    done: plugins.smartq.Deferred<{}>;
    constructor(optionsArg: SocketRequestConstructorOptions);
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch(): Promise<{}>;
    /**
     * handles the response that is received by the requesting side
     */
    handleResponse(responseDataArg: ISocketRequestDataObject): void;
    /**
     * creates the response on the responding side
     */
    createResponse(): void;
}
