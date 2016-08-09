import * as plugins from "./smartsocket.plugins"


// import interfaces
import { ISocketFunctionCall } from "./smartsocket.classes.socketfunction";
import { ISocketRequestDataObject } from "./smartsocket.classes.socketrequest"

// import classes
import { SocketConnection } from "./smartsocket.classes.socketconnection";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
import { SocketRequest } from "./smartsocket.classes.socketrequest";
/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
}

export class SmartsocketClient {
    socketConnection:SocketConnection;
    constructor(optionsArg:ISmartsocketClientOptions){
        // TODO: implement Socket init
    };
    serverCall(functionNameArg:string,dataArg:ISocketFunctionCall){
        let socketRequest = new SocketRequest({
            side:"requesting",
            originSocketConnection:this.socketConnection,
            shortId:plugins.shortid.generate(),
            funcCallData:{
                funcName: functionNameArg,
                funcDataArg:dataArg
            }
        });
        socketRequest.dispatch();
    }
    
}