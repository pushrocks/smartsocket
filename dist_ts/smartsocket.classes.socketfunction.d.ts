import * as plugins from './smartsocket.plugins';
import { SocketRole } from './smartsocket.classes.socketrole';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';
/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    funcName: T['method'];
    funcDef: TFuncDef<T>;
    allowedRoles: SocketRole[];
}
/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCallDataRequest<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    funcName: T['method'];
    funcDataArg: T['request'];
}
/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCallDataResponse<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    funcName: T['method'];
    funcDataArg: T['response'];
}
/**
 * interface for function definition of SocketFunction
 */
export declare type TFuncDef<T extends plugins.typedrequestInterfaces.ITypedRequest> = (dataArg: T['request'], connectionArg: SocketConnection) => PromiseLike<T['response']>;
/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export declare class SocketFunction<T extends plugins.typedrequestInterfaces.ITypedRequest> {
    static getSocketFunctionByName<Q extends plugins.typedrequestInterfaces.ITypedRequest>(smartsocketRefArg: Smartsocket | SmartsocketClient, functionNameArg: string): SocketFunction<Q>;
    name: string;
    funcDef: TFuncDef<T>;
    roles: SocketRole[];
    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg: ISocketFunctionConstructorOptions<T>);
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg: ISocketFunctionCallDataRequest<T>, socketConnectionArg: SocketConnection): Promise<ISocketFunctionCallDataResponse<T>>;
    /**
     * notifies a role about access to this SocketFunction
     */
    private _notifyRole;
}
