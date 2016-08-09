/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { SocketRole } from "./smartsocket.classes.socketrole";
/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionOptions {
    funcName: string;
    funcDef: any;
    allowedRoles: SocketRole[];
}
/**
 * interface of the Socket Function call
 */
export interface ISocketFunctionCall {
    funcName: string;
    funcDataArg: any;
}
/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export declare class SocketFunction {
    name: string;
    func: any;
    roles: SocketRole[];
    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg: ISocketFunctionOptions);
    /**
     * notifies a role about access to this SocketFunction
     */
    private _notifyRole(socketRoleArg);
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg: any): plugins.q.Promise<any>;
}
