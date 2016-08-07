import * as plugins from "./smartsocket.plugins";

// import classes
import { Stringmap } from "lik";

/**
 * interface for class SocketRole
 */
export interface SocketRoleOptions {
    name:string;
    passwordHash:string;
}


/**
 * A socketrole defines access to certain routines.
 */
export class SocketRole {
    name:string;
    passwordHash:string;
    constructor(optionsArg:SocketRoleOptions){
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
    }
}