import * as plugins from './smartsocket.plugins';
import { ISocketFunctionCallDataRequest, ISocketFunctionCallDataResponse } from './smartsocket.classes.socketfunction';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';
export declare type TSocketRequestStatus = 'new' | 'pending' | 'finished';
export declare type TSocketRequestSide = 'requesting' | 'responding';
/**
 * interface of constructor of class SocketRequest
 */
export interface ISocketRequestConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    side: TSocketRequestSide;
    originSocketConnection: SocketConnection;
    shortId: string;
    funcCallData?: ISocketFunctionCallDataRequest<T>;
}
/**
 * request object that is sent initially and may or may not receive a response
 */
export interface ISocketRequestDataObject<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    funcCallData: ISocketFunctionCallDataRequest<T> | ISocketFunctionCallDataResponse<T>;
    shortId: string;
    responseTimeout?: number;
}
export declare class SocketRequest<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    static getSocketRequestById(smartsocketRef: Smartsocket | SmartsocketClient, shortIdArg: string): SocketRequest<any>;
    status: TSocketRequestStatus;
    side: TSocketRequestSide;
    shortid: string;
    originSocketConnection: SocketConnection;
    funcCallData: ISocketFunctionCallDataRequest<T>;
    done: plugins.smartpromise.Deferred<ISocketFunctionCallDataResponse<T>>;
    smartsocketRef: Smartsocket | SmartsocketClient;
    constructor(smartsocketRefArg: Smartsocket | SmartsocketClient, optionsArg: ISocketRequestConstructorOptions<T>);
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch(): Promise<ISocketFunctionCallDataResponse<T>>;
    /**
     * handles the response that is received by the requesting side
     */
    handleResponse(responseDataArg: ISocketRequestDataObject<T>): Promise<void>;
    /**
     * creates the response on the responding side
     */
    createResponse(): Promise<void>;
}
