import * as plugins from "./smartsocket.plugins";

// import classes
import { Stringmap } from "lik";
import { SocketRole } from "./smartsocket.classes.socketrole";

export interface ISocketFunctionData {
    functionName:string,
    functionData:any,
    responseTimeout?:number
};

export interface SocketFunctionOptions {
    name: string;
    func: any;
    roles: SocketRole[]; // all roles that are allowed to execute a SocketFunction
};

export class SocketFunction {
    name: string;
    func: any;
    roles: SocketRole[];

    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg: SocketFunctionOptions) {
        this.name = optionsArg.name;
        this.func = optionsArg.func;
        this.roles = optionsArg.roles;
        for (let socketRoleArg of this.roles){
            this._notifyRole(socketRoleArg);
        }
    };

    /** 
     * notifies a role about access to this SocketFunction
     */
    private _notifyRole(socketRoleArg:SocketRole){
        socketRoleArg.addSocketFunction(this);
    }
    
    /**
     * handles a function request to this SocketFunction
     */
    functionRequest(dataArg:ISocketFunctionData){
        
    };

}