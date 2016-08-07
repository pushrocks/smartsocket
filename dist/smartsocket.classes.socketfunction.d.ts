import { SocketRole } from "./smartsocket.classes.socketrole";
export interface SocketFunctionOptions {
    name: string;
    func: any;
    roles: SocketRole[];
}
export declare class SocketFunction {
    name: string;
    func: any;
    roles: SocketRole[];
    constructor(optionsArg: SocketFunctionOptions);
}
