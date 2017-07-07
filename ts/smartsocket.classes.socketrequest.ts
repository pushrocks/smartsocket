import * as plugins from './smartsocket.plugins'
import * as helpers from './smartsocket.helpers'

// import interfaces
import { ISocketFunctionCall } from './smartsocket.classes.socketfunction'

// import classes
import { Objectmap } from 'lik'
import { SocketFunction } from './smartsocket.classes.socketfunction'
import { SocketConnection } from './smartsocket.classes.socketconnection'

// export interfaces
export type TSocketRequestStatus = 'new' | 'pending' | 'finished'
export type TSocketRequestSide = 'requesting' | 'responding'

/**
 * interface of constructor of class SocketRequest
 */
export interface SocketRequestConstructorOptions {
  side: TSocketRequestSide
  originSocketConnection: SocketConnection
  shortId: string
  funcCallData?: ISocketFunctionCall
}

/**
 * request object that is sent initially and may or may not receive a response
 */
export interface ISocketRequestDataObject {
  funcCallData: ISocketFunctionCall
  shortId: string
  responseTimeout?: number
}

// export objects
export let allSocketRequests = new Objectmap<SocketRequest>()

// export classes
export class SocketRequest {
  status: TSocketRequestStatus = 'new'
  side: TSocketRequestSide
  shortid: string
  originSocketConnection: SocketConnection
  funcCallData: ISocketFunctionCall
  done = plugins.smartq.defer()
  constructor (optionsArg: SocketRequestConstructorOptions) {
    this.side = optionsArg.side
    this.shortid = optionsArg.shortId
    this.funcCallData = optionsArg.funcCallData
    this.originSocketConnection = optionsArg.originSocketConnection
    allSocketRequests.add(this)
  }

  // requesting --------------------------

  /**
   * dispatches a socketrequest from the requesting to the receiving side
   */
  dispatch () {
    let requestData: ISocketRequestDataObject = {
      funcCallData: this.funcCallData,
      shortId: this.shortid
    }
    this.originSocketConnection.socket.emit('function', requestData)
    return this.done.promise
  }

  /**
   * handles the response that is received by the requesting side
   */
  handleResponse (responseDataArg: ISocketRequestDataObject) {
    plugins.beautylog.log('handling response!')
    this.done.resolve(responseDataArg.funcCallData)
    allSocketRequests.remove(this)
  }

  // responding --------------------------

  /**
   * creates the response on the responding side
   */
  createResponse () {
    let targetSocketFunction: SocketFunction = helpers.getSocketFunctionByName(this.funcCallData.funcName)
    plugins.beautylog.info(`invoking ${targetSocketFunction.name}`)
    targetSocketFunction.invoke(this.funcCallData)
      .then((resultData) => {
        plugins.beautylog.log('got resultData. Sending it to requesting party.')
        let requestData: ISocketRequestDataObject = {
          funcCallData: resultData,
          shortId: this.shortid
        }
        this.originSocketConnection.socket.emit('functionResponse', requestData)
        allSocketRequests.remove(this)
      })
  }
}
