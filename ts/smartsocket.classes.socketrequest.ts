import * as plugins from "./smartsocket.plugins";

// import interfaces
import { ISocketFunctionCall } from "./smartsocket.classes.socketfunction";

// import classes
import { Objectmap } from "lik";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketConnection } from "./smartsocket.classes.socketconnection";

// export interfaces
export type TSocketRequestStatus = "new" | "pending" | "finished";
export type TSocketRequestSide = "requesting" | "responding";

/**
 * request object that is sent initially and may or may not receive a response
 */
export interface ISocketRequestDataObject {
    funcName:string,
    funcDataArg:any,
    shortId:string,
    responseTimeout?:number
};

export interface SocketRequestConstructorOptions {
    side: TSocketRequestSide;
    originSocketConnection:SocketConnection;
    shortId: string;
    funcCallData?: ISocketFunctionCall;
};

//export objects
export let allRequestingSocketRequests = new Objectmap<SocketRequest>();
export let allRespondingSocketRequests = new Objectmap<SocketRequest>();

// export classes
export class SocketRequest {
    status: TSocketRequestStatus = "new";
    side: TSocketRequestSide;
    shortid: string;
    originSocketConnection:SocketConnection;
    requestData: ISocketRequestDataObject;
    responseData: ISocketRequestDataObject;
    constructor(optionsArg: SocketRequestConstructorOptions) {
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        if(this.side === "requesting"){
            allRequestingSocketRequests.add(this);
        } else {
            allRespondingSocketRequests.add(this);
        };
    };
    
    respond(dataArg){

    }
    // private functions
    private _sendRequest(dataArg:ISocketRequestDataObject){
        
    };
    private _receiveRequest(dataArg:ISocketRequestDataObject){

    };
    private _sendResponse(dataArg:ISocketRequestDataObject){

    }
    private _receiveResponse(dataArg:ISocketRequestDataObject){
        
    };
    private _dispatch(dataArg:ISocketRequestDataObject){ // note: dispatch is private as it will be fired from the constructor

    };
};
