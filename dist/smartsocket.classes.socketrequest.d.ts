import { ISocketFunctionRequestObject, ISocketFunctionResponseObject } from "./smartsocket.classes.socketfunction";
import { Objectmap } from "lik";
export declare type TSocketRequestStatus = "new" | "pending" | "finished";
export declare type TSocketRequestSide = "requesting" | "responding";
export interface SocketRequestConstructorOptions {
    side: TSocketRequestSide;
    shortid: string;
    requestData?: ISocketFunctionRequestObject;
    responseData?: ISocketFunctionResponseObject;
}
export declare let allRequestingSocketRequests: Objectmap<SocketRequest>;
export declare let allRespondingSocketRequests: Objectmap<SocketRequest>;
export declare class SocketRequest {
    status: TSocketRequestStatus;
    side: TSocketRequestSide;
    shortid: string;
    requestData: ISocketFunctionRequestObject;
    responseData: ISocketFunctionResponseObject;
    constructor(optionsArg: SocketRequestConstructorOptions);
    private _sendRequest(dataArg);
    private _receiveRequest(dataArg);
    private _sendResponse(dataArg);
    private _receiveResponse(dataArg);
    private _dispatch(dataArg);
}
