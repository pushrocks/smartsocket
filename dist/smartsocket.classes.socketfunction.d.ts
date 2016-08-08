import { SocketRole } from "./smartsocket.classes.socketrole";
export interface ISocketFunctionData {
    functionName: string;
    functionData: any;
    responseTimeout?: number;
}
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
    private _notifyRole(socketRoleArg);
    functionRequest(dataArg: ISocketFunctionData): void;
}
