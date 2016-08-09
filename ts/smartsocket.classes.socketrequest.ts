import * as plugins from "./smartsocket.plugins";

// import interfaces
import { ISocketFunctionRequestObject, ISocketFunctionResponseObject } from "./smartsocket.classes.socketfunction";

// import classes
import { Objectmap } from "lik";
import { SocketFunction } from "./smartsocket.classes.socketfunction";

// export interfaces
export type TSocketRequestStatus = "new" | "pending" | "finished";
export type TSocketRequestSide = "requesting" | "responding";

export interface SocketRequestConstructorOptions {
    side: TSocketRequestSide;
    shortid: string;
    requestData?: ISocketFunctionRequestObject;
    responseData?:ISocketFunctionResponseObject;
};

//export objects
export let allRequestingSocketRequests = new Objectmap<SocketRequest>();
export let allRespondingSocketRequests = new Objectmap<SocketRequest>();

// export classes
export class SocketRequest {
    status: TSocketRequestStatus = "new";
    side: TSocketRequestSide;
    shortid: string;
    requestData: ISocketFunctionRequestObject;
    responseData: ISocketFunctionResponseObject;
    constructor(optionsArg: SocketRequestConstructorOptions) {
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortid;
        this.requestData = optionsArg.requestData;
        this.responseData = optionsArg.responseData;
        if(this.side === "requesting"){
            allRequestingSocketRequests.add(this);
        } else {
            allRespondingSocketRequests.add(this);
        };
    };
    
    private _sendRequest(dataArg:ISocketFunctionRequestObject){

    };
    private _receiveRequest(dataArg:ISocketFunctionRequestObject){

    };
    private _sendResponse(dataArg:ISocketFunctionResponseObject){

    }
    private _receiveResponse(dataArg:ISocketFunctionResponseObject){
        
    };
    private _dispatch(dataArg:ISocketFunctionRequestObject){ // note: dispatch is private as it will be fired from the constructor

    };
};
