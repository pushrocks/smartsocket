import * as plugins from './smartsocket.plugins';

// import interfaces
import { SocketFunction, ISocketFunctionCallDataRequest, ISocketFunctionCallDataResponse } from './smartsocket.classes.socketfunction';

// import classes
import { SocketConnection } from './smartsocket.classes.socketconnection';
import { logger } from './smartsocket.logging';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';

// export interfaces
export type TSocketRequestStatus = 'new' | 'pending' | 'finished';
export type TSocketRequestSide = 'requesting' | 'responding';

/**
 * interface of constructor of class SocketRequest
 */
export interface ISocketRequestConstructorOptions<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  side: TSocketRequestSide;
  originSocketConnection: SocketConnection;
  shortId: string;
  funcCallData?: ISocketFunctionCallDataRequest<T>;
}

/**
 * request object that is sent initially and may or may not receive a response
 */
export interface ISocketRequestDataObject<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  funcCallData: ISocketFunctionCallDataRequest<T> | ISocketFunctionCallDataResponse<T>;
  shortId: string;
  responseTimeout?: number;
}

// export classes
export class SocketRequest<T extends plugins.typedrequestInterfaces.ITypedRequest> {
  // STATIC
  public static getSocketRequestById(
    smartsocketRef: Smartsocket | SmartsocketClient,
    shortIdArg: string
  ): SocketRequest<any> {
    return smartsocketRef.socketRequests.find(socketRequestArg => {
      return socketRequestArg.shortid === shortIdArg;
    });
  }

  // INSTANCE
  public status: TSocketRequestStatus = 'new';
  public side: TSocketRequestSide;
  public shortid: string;
  public originSocketConnection: SocketConnection;
  public funcCallData: ISocketFunctionCallDataRequest<T>;
  public done = plugins.smartpromise.defer<ISocketFunctionCallDataResponse<T>>();

  public smartsocketRef: Smartsocket | SmartsocketClient;

  constructor(
    smartsocketRefArg: Smartsocket | SmartsocketClient,
    optionsArg: ISocketRequestConstructorOptions<T>
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
  public dispatch(): Promise<ISocketFunctionCallDataResponse<T>> {
    const requestData: ISocketRequestDataObject<T> = {
      funcCallData: this.funcCallData,
      shortId: this.shortid
    };
    this.originSocketConnection.socket.emit('function', requestData);
    return this.done.promise;
  }

  /**
   * handles the response that is received by the requesting side
   */
  public async handleResponse(responseDataArg: ISocketRequestDataObject<T>) {
    logger.log('info', 'handling response!');
    this.done.resolve(responseDataArg.funcCallData);
    this.smartsocketRef.socketRequests.remove(this);
  }

  // responding --------------------------

  /**
   * creates the response on the responding side
   */
  public async createResponse(): Promise<void> {
    const targetSocketFunction: SocketFunction<T> = SocketFunction.getSocketFunctionByName(
      this.smartsocketRef,
      this.funcCallData.funcName
    );

    if (!targetSocketFunction) {
      logger.log(
        'warn',
        `There is no SocketFunction defined for ${this.funcCallData.funcName}`
      );
      logger.log('warn', `So now response is being sent.`);
      return;
    }
    logger.log('info', `invoking ${targetSocketFunction.name}`);
    targetSocketFunction.invoke(this.funcCallData, this.originSocketConnection).then(resultData => {
      logger.log('info', 'got resultData. Sending it to requesting party.');
      const responseData: ISocketRequestDataObject<T> = {
        funcCallData: resultData,
        shortId: this.shortid
      };
      this.originSocketConnection.socket.emit('functionResponse', responseData);
      this.smartsocketRef.socketRequests.remove(this);
    });
  }
}
