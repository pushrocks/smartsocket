import * as plugins from './smartsocket.plugins';

// import interfaces
import { SocketFunction, ISocketFunctionCall } from './smartsocket.classes.socketfunction';

// import classes
import { Objectmap } from '@pushrocks/lik';
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { defaultLogger } from '@pushrocks/smartlog';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';

// export interfaces
export type TSocketRequestStatus = 'new' | 'pending' | 'finished';
export type TSocketRequestSide = 'requesting' | 'responding';

/**
 * interface of constructor of class SocketRequest
 */
export interface SocketRequestConstructorOptions {
  side: TSocketRequestSide;
  originSocketConnection: SocketConnection;
  shortId: string;
  funcCallData?: ISocketFunctionCall;
}

/**
 * request object that is sent initially and may or may not receive a response
 */
export interface ISocketRequestDataObject {
  funcCallData: ISocketFunctionCall;
  shortId: string;
  responseTimeout?: number;
}

// export classes
export class SocketRequest {
  // STATIC
  public static getSocketRequestById(
    smartsocketRef: Smartsocket | SmartsocketClient,
    shortIdArg: string
  ): SocketRequest {
    return smartsocketRef.socketRequests.find(socketRequestArg => {
      return socketRequestArg.shortid === shortIdArg;
    });
  }

  // INSTANCE
  public status: TSocketRequestStatus = 'new';
  public side: TSocketRequestSide;
  public shortid: string;
  public originSocketConnection: SocketConnection;
  public funcCallData: ISocketFunctionCall;
  public done = plugins.smartpromise.defer();

  public smartsocketRef: Smartsocket | SmartsocketClient;

  constructor(
    smartsocketRefArg: Smartsocket | SmartsocketClient,
    optionsArg: SocketRequestConstructorOptions
  ) {
    this.smartsocketRef = smartsocketRefArg;
    this.side = optionsArg.side;
    this.shortid = optionsArg.shortId;
    this.funcCallData = optionsArg.funcCallData;
    this.originSocketConnection = optionsArg.originSocketConnection;
    this.smartsocketRef.socketRequests.add(this);
  }

  // requesting --------------------------

  /**
   * dispatches a socketrequest from the requesting to the receiving side
   */
  public dispatch() {
    const requestData: ISocketRequestDataObject = {
      funcCallData: this.funcCallData,
      shortId: this.shortid
    };
    this.originSocketConnection.socket.emit('function', requestData);
    return this.done.promise;
  }

  /**
   * handles the response that is received by the requesting side
   */
  public handleResponse(responseDataArg: ISocketRequestDataObject) {
    plugins.smartlog.defaultLogger.log('info', 'handling response!');
    this.done.resolve(responseDataArg.funcCallData);
    this.smartsocketRef.socketRequests.remove(this);
  }

  // responding --------------------------

  /**
   * creates the response on the responding side
   */
  public async createResponse(): Promise<void> {
    const targetSocketFunction: SocketFunction = SocketFunction.getSocketFunctionByName(
      this.smartsocketRef,
      this.funcCallData.funcName
    );

    if (!targetSocketFunction) {
      defaultLogger.log(
        'warn',
        `There is no SocketFunction defined for ${this.funcCallData.funcName}`
      );
      defaultLogger.log('warn', `So now response is being sent.`);
      return;
    }
    plugins.smartlog.defaultLogger.log('info', `invoking ${targetSocketFunction.name}`);
    targetSocketFunction.invoke(this.funcCallData, this.originSocketConnection).then(resultData => {
      plugins.smartlog.defaultLogger.log('info', 'got resultData. Sending it to requesting party.');
      const requestData: ISocketRequestDataObject = {
        funcCallData: resultData,
        shortId: this.shortid
      };
      this.originSocketConnection.socket.emit('functionResponse', requestData);
      this.smartsocketRef.socketRequests.remove(this);
    });
  }
}
