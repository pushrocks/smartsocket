import * as plugins from './smartsocket.plugins';
import { SocketFunction } from './smartsocket.classes.socketfunction';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';
import { ISocketConnectionAuthenticationObject } from './smartsocket.classes.socketconnection';
/**
 * interface for class SocketRole
 */
export interface ISocketRoleOptions {
    name: string;
    passwordHash: string;
}
/**
 * A socketrole defines access to certain routines.
 */
export declare class SocketRole {
    static getSocketRoleByName(referenceSmartsocket: Smartsocket | SmartsocketClient, socketRoleNameArg: string): SocketRole;
    static checkPasswordForRole(dataArg: ISocketConnectionAuthenticationObject, referenceSmartsocket: Smartsocket | SmartsocketClient): boolean;
    name: string;
    passwordHash: string;
    allowedFunctions: plugins.lik.ObjectMap<SocketFunction<any>>;
    constructor(optionsArg: ISocketRoleOptions);
    /**
     * adds the socketfunction to the socketrole
     * @param socketFunctionArg
     */
    addSocketFunction(socketFunctionArg: SocketFunction<any>): void;
}
