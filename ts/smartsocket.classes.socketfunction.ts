import * as plugins from './smartsocket.plugins';

// import classes
import { Objectmap } from '@pushrocks/lik';
import { SocketRole } from './smartsocket.classes.socketrole';
import { SocketConnection } from './smartsocket.classes.socketconnection';

// export interfaces

/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionConstructorOptions {
  funcName: string;
  funcDef: TFuncDef;
  allowedRoles: SocketRole[]; // all roles that are allowed to execute a SocketFunction
}

/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCall {
  funcName: string;
  funcDataArg: any;
}

/**
 * interface for function definition of SocketFunction
 */
export type TFuncDef = (dataArg: any, connectionArg: SocketConnection) => PromiseLike<any>;

// export objects
export let allSocketFunctions = new Objectmap<SocketFunction>();

// export classes

/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export class SocketFunction {
  name: string;
  funcDef: TFuncDef;
  roles: SocketRole[];

  /**
   * the constructor for SocketFunction
   */
  constructor(optionsArg: ISocketFunctionConstructorOptions) {
    this.name = optionsArg.funcName;
    this.funcDef = optionsArg.funcDef;
    this.roles = optionsArg.allowedRoles;
    for (let socketRoleArg of this.roles) {
      this._notifyRole(socketRoleArg);
    }
    allSocketFunctions.add(this); // map instance with Objectmap
  }

  /**
   * invokes the function of this SocketFunction
   */
  invoke(dataArg: ISocketFunctionCall, socketConnectionArg: SocketConnection): Promise<any> {
    let done = plugins.smartpromise.defer();
    if (dataArg.funcName === this.name) {
      this.funcDef(dataArg.funcDataArg, socketConnectionArg).then((resultData: any) => {
        let funcResponseData: ISocketFunctionCall = {
          funcName: this.name,
          funcDataArg: resultData
        };
        done.resolve(funcResponseData);
      });
    } else {
      throw new Error("SocketFunction.name does not match the data argument's .name!");
    }
    return done.promise;
  }

  /**
   * notifies a role about access to this SocketFunction
   */
  private _notifyRole(socketRoleArg: SocketRole) {
    socketRoleArg.addSocketFunction(this);
  }
}
