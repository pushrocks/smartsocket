import * as plugins from "./smartsocket.plugins"


// import interfaces
import { ISocketFunctionRequestObject, ISocketFunctionResponseObject } from "./smartsocket.classes.socketfunction";

// import classes
import { SocketFunction } from "./smartsocket.classes.socketfunction";

/**
 * interface for class SmartsocketClient
 */
export interface ISmartsocketClientOptions {
    port: number;
    url: string;
}

export class SmartsocketClient {
    constructor() {

    }
    dispatchFunctionRequest(dataArg:ISocketFunctionRequestObject): plugins.q.Promise<ISocketFunctionResponseObject> {
        let done = plugins.q.defer<ISocketFunctionResponseObject>();
        let responseData:ISocketFunctionResponseObject;
        done.resolve(responseData);
        return done.promise;
    };
}