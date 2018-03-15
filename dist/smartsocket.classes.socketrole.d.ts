import * as plugins from './smartsocket.plugins';
import { SocketFunction } from './smartsocket.classes.socketfunction';
/**
 * interface for class SocketRole
 */
export interface SocketRoleOptions {
    name: string;
    passwordHash: string;
}
/**
 * A socketrole defines access to certain routines.
 */
export declare class SocketRole {
    name: string;
    passwordHash: string;
    allowedFunctions: plugins.lik.Objectmap<SocketFunction>;
    constructor(optionsArg: SocketRoleOptions);
    addSocketFunction(socketFunctionArg: SocketFunction): void;
}
