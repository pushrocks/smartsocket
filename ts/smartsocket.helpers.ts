import * as plugins from './smartsocket.plugins';

// classes
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SocketFunction, allSocketFunctions } from './smartsocket.classes.socketfunction';
import {
  SocketConnection,
  ISocketConnectionAuthenticationObject
} from './smartsocket.classes.socketconnection';
import {
  SocketRequest,
  allSocketRequests,
  TSocketRequestSide
} from './smartsocket.classes.socketrequest';
import { SocketRole } from './smartsocket.classes.socketrole';

// SocketConnection helpers
export let checkPasswordForRole = (
  dataArg: ISocketConnectionAuthenticationObject,
  referenceSmartsocket: Smartsocket
): boolean => {
  let targetPasswordHash = getSocketRoleByName(dataArg.role, referenceSmartsocket).passwordHash;
  let computedCompareHash = plugins.nodehash.sha256FromStringSync(dataArg.password);
  return targetPasswordHash === computedCompareHash;
};

// SocketFunction helpers
export let getSocketFunctionByName = (functionNameArg: string): SocketFunction => {
  return allSocketFunctions.find(socketFunctionArg => {
    return socketFunctionArg.name === functionNameArg;
  });
};

// SocketRequest helpers

/**
 * get corresponding Socketrequest instance by shortId
 */
export let getSocketRequestById = (
  shortIdArg: string,
  requestSide?: TSocketRequestSide
): SocketRequest => {
  return allSocketRequests.find(socketRequestArg => {
    return socketRequestArg.shortid === shortIdArg;
  });
};

// SocketRole helpers

/**
 * get corresponding SocketRole instance by name
 */
export let getSocketRoleByName = (
  socketRoleNameArg: string,
  referenceSmartsocket: Smartsocket
): SocketRole => {
  return referenceSmartsocket.socketRoles.find(socketRoleArg => {
    return socketRoleArg.name === socketRoleNameArg;
  });
};
