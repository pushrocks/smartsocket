import { Objectmap } from "lik";
import { SocketFunction } from "./smartsocket.classes.socketfunction";
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
    allowedFunctions: Objectmap<SocketFunction>;
    constructor(optionsArg: SocketRoleOptions);
    addSocketFunction(socketFunctionArg: SocketFunction): void;
}
