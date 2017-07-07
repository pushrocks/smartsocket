import * as plugins from './smartsocket.plugins'

// import classes
import { Objectmap } from 'lik'
import { SocketRole } from './smartsocket.classes.socketrole'

// export interfaces

/**
 * interface of the contructor options of class SocketFunction
 */
export interface ISocketFunctionConstructorOptions {
  funcName: string
  funcDef: any
  allowedRoles: SocketRole[] // all roles that are allowed to execute a SocketFunction
}

/**
 * interface of the Socket Function call, in other words the object that routes a call to a function
 */
export interface ISocketFunctionCall {
  funcName: string
  funcDataArg: any
}

/**
 * interface for function definition of SocketFunction
 */
export interface IFuncDef {
  (dataArg: any): PromiseLike<any>
}

// export objects
export let allSocketFunctions = new Objectmap<SocketFunction>()

// export classes

/**
 * class that respresents a function that can be transparently called using a SocketConnection
 */
export class SocketFunction {
  name: string
  funcDef: IFuncDef
  roles: SocketRole[]

  /**
   * the constructor for SocketFunction
   */
  constructor (optionsArg: ISocketFunctionConstructorOptions) {
    this.name = optionsArg.funcName
    this.funcDef = optionsArg.funcDef
    this.roles = optionsArg.allowedRoles
    for (let socketRoleArg of this.roles) {
      this._notifyRole(socketRoleArg)
    }
    allSocketFunctions.add(this) // map instance with Objectmap
  }

  /**
   * invokes the function of this SocketFunction
   */
  invoke (dataArg: ISocketFunctionCall): Promise<any> {
    let done = plugins.smartq.defer()
    if (dataArg.funcName === this.name) {
      this.funcDef(dataArg.funcDataArg)
        .then((resultData: any) => {
          let funcResponseData: ISocketFunctionCall = {
            funcName: this.name,
            funcDataArg: resultData
          }
          done.resolve(funcResponseData)
        })

    } else {
      throw new Error("SocketFunction.name does not match the data argument's .name!")
    }
    return done.promise
  }

  /**
   * notifies a role about access to this SocketFunction
   */
  private _notifyRole (socketRoleArg: SocketRole) {
    socketRoleArg.addSocketFunction(this)
  }
}
