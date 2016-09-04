import * as plugins from "./smartsocket.plugins";

// import classes
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
export class SocketRole {
    name: string;
    passwordHash: string;
    allowedFunctions = new Objectmap<SocketFunction>();
    constructor(optionsArg: SocketRoleOptions) {
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
    };
    addSocketFunction(socketFunctionArg:SocketFunction){
        this.allowedFunctions.add(socketFunctionArg);
    }
}