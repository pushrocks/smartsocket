import { ISocketFunctionResponseObject } from "./smartsocket.classes.socketfunction";
import { Objectmap } from "lik";
export declare type TSocketRequestStatus = "new" | "pending" | "finished";
export declare type TSocketRequestSide = "requesting" | "responding";
export interface SocketRequestConstructorOptions {
    side: TSocketRequestSide;
    shortid: string;
}
export declare let allRequestingSocketRequests: Objectmap<SocketRequest>;
export declare let allRespondingSocketRequests: Objectmap<SocketRequest>;
export declare class SocketRequest {
    status: TSocketRequestStatus;
    side: TSocketRequestSide;
    shortid: string;
    constructor(optionsArg: SocketRequestConstructorOptions);
    respond(dataArg: ISocketFunctionResponseObject): void;
    private _dispatch();
}
