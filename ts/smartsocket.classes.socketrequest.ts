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
};

//export objects
export let allRequestingSocketRequests = new Objectmap<SocketRequest>();
export let allRespondingSocketRequests = new Objectmap<SocketRequest>();

// export classes
export class SocketRequest {
    status: TSocketRequestStatus = "new";
    side: TSocketRequestSide;
    shortid: string;
    constructor(optionsArg: SocketRequestConstructorOptions) {
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortid;
        if(this.side === "requesting"){
            allRequestingSocketRequests.add(this);
        } else {
            allRespondingSocketRequests.add(this);
        };
    };
    respond(dataArg:ISocketFunctionResponseObject){

    }
    private _dispatch(){ // note: dispatch is private as it will be fired from the constructor
        
    }
};
