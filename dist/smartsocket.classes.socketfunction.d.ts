/// <reference types="q" />
import * as plugins from "./smartsocket.plugins";
import { Objectmap } from "lik";
import { SocketRole } from "./smartsocket.classes.socketrole";
/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionConstructorOptions {
    funcName: string;
    funcDef: any;
    allowedRoles: SocketRole[];
}
/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCall {
    funcName: string;
    funcDataArg: any;
}
/**
 * interface for function definition of SocketFunction
 */
export interface IFuncDef {
    (dataArg: any): PromiseLike<any>;
}
export declare let allSocketFunctions: Objectmap<SocketFunction>;
/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export declare class SocketFunction {
    name: string;
    funcDef: IFuncDef;
    roles: SocketRole[];
    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg: ISocketFunctionConstructorOptions);
    /**
     * notifies a role about access to this SocketFunction
     */
    private _notifyRole(socketRoleArg);
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg: ISocketFunctionCall): plugins.q.Promise<any>;
}
