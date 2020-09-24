import * as plugins from './smartsocket.plugins';

// import classes
import { SocketRole } from './smartsocket.classes.socketrole';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';

// export interfaces

/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionConstructorOptions<
  T extends plugins.typedrequestInterfaces.ITypedRequest
> {
  funcName: T['method'];
  funcDef: TFuncDef<T>;
  allowedRoles: SocketRole[]; // all roles that are allowed to execute a SocketFunction
}

/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCallDataRequest<
  T extends plugins.typedrequestInterfaces.ITypedRequest
> {
  funcName: T['method'];
  funcDataArg: T['request'];
}

/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCallDataResponse<
  T extends plugins.typedrequestInterfaces.ITypedRequest
> {
  funcName: T['method'];
  funcDataArg: T['response'];
}

/**
 * interface for function definition of SocketFunction
 */
export type TFuncDef<T extends plugins.typedrequestInterfaces.ITypedRequest> = (
  dataArg: T['request'],
  connectionArg: SocketConnection
) => PromiseLike<T['response']>;

// export classes

/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export class SocketFunction<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  // STATIC
  public static getSocketFunctionByName<Q extends plugins.typedrequestInterfaces.ITypedRequest>(
    smartsocketRefArg: Smartsocket | SmartsocketClient,
    functionNameArg: string
  ): SocketFunction<Q> {
    return smartsocketRefArg.socketFunctions.find((socketFunctionArg) => {
      return socketFunctionArg.name === functionNameArg;
    });
  }

  // INSTANCE
  public name: string;
  public funcDef: TFuncDef<T>;
  public roles: SocketRole[];

  /**
   * the constructor for SocketFunction
   */
  constructor(optionsArg: ISocketFunctionConstructorOptions<T>) {
    this.name = optionsArg.funcName;
    this.funcDef = optionsArg.funcDef;
    this.roles = optionsArg.allowedRoles;
    for (const socketRoleArg of this.roles) {
      this._notifyRole(socketRoleArg);
    }
  }

  /**
   * invokes the function of this SocketFunction
   */
  public async invoke(
    dataArg: ISocketFunctionCallDataRequest<T>,
    socketConnectionArg: SocketConnection
  ): Promise<ISocketFunctionCallDataResponse<T>> {
    if (dataArg.funcName === this.name) {
      const funcResponseData: ISocketFunctionCallDataResponse<T> = {
        funcName: this.name,
        funcDataArg: await this.funcDef(dataArg.funcDataArg, socketConnectionArg),
      };
      return funcResponseData;
    } else {
      throw new Error("SocketFunction.name does not match the data argument's .name!");
    }
  }

  /**
   * notifies a role about access to this SocketFunction
   */
  private _notifyRole(socketRoleArg: SocketRole) {
    socketRoleArg.addSocketFunction(this);
  }
}
