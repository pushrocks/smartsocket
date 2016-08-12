import * as plugins from "./smartsocket.plugins";

// import classes
import { Objectmap } from "lik";
import { SocketRole } from "./smartsocket.classes.socketrole";

// export interfaces




/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionConstructorOptions {
    funcName: string;
    funcDef: any;
    allowedRoles: SocketRole[]; // all roles that are allowed to execute a SocketFunction
};

/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCall {
    funcName:string;
    funcDataArg:any;
}

// export objects
export let allSocketFunctions = new Objectmap<SocketFunction>();

// export classes

/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export class SocketFunction {
    name: string;
    func: any;
    roles: SocketRole[];

    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg: ISocketFunctionConstructorOptions) {
        this.name = optionsArg.funcName;
        this.func = optionsArg.funcDef;
        this.roles = optionsArg.allowedRoles;
        for (let socketRoleArg of this.roles){
            this._notifyRole(socketRoleArg);
        };
        allSocketFunctions.add(this); // map instance with Objectmap
    };

    /** 
     * notifies a role about access to this SocketFunction
     */
    private _notifyRole(socketRoleArg:SocketRole){
        socketRoleArg.addSocketFunction(this);
    }
    
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg:any):plugins.q.Promise<any> {
        let done = plugins.q.defer();

        return done.promise;        
    };

}