import { SocketRole } from "./smartsocket.classes.socketrole";
export interface ISocketFunctionRequestObject {
    functionName: string;
    argumentObject: any;
    shortId: string;
    responseTimeout?: number;
}
export interface ISocketFunctionResponseObject {
    shortId: string;
    argumentObject: any;
}
export interface SocketFunctionOptions {
    name: string;
    func: any;
    roles: SocketRole[];
}
/**
 * class SocketFunction respresents a function that can be transparently called using a SocketConnection
 */
export declare class SocketFunction {
    name: string;
    func: any;
    roles: SocketRole[];
    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg: SocketFunctionOptions);
    /**
     * notifies a role about access to this SocketFunction
     */
    private _notifyRole(socketRoleArg);
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg: ISocketFunctionRequestObject): void;
}
