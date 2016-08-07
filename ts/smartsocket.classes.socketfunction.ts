import * as plugins from "./smartsocket.plugins";

// import classes
import { SocketRole } from "./smartsocket.classes.socketrole";



export interface SocketFunctionOptions {
    name: string;
    func: any;
    roles: SocketRole[]; // all roles that are allowed to execute a SocketFunction
};

export class SocketFunction {
    name: string;
    func: any;
    roles: SocketRole[];
    constructor(optionsArg: SocketFunctionOptions) {
        this.name = optionsArg.name;
        this.func = optionsArg.func;
        this.roles = optionsArg.roles;
    };
}