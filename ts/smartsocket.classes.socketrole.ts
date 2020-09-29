import * as plugins from './smartsocket.plugins';

// import classes
import { SocketFunction } from './smartsocket.classes.socketfunction';
import { Smartsocket } from './smartsocket.classes.smartsocket';
import { SmartsocketClient } from './smartsocket.classes.smartsocketclient';
import { ISocketConnectionAuthenticationObject } from './smartsocket.classes.socketconnection';

/**
 * interface for class SocketRole
 */
export interface ISocketRoleOptions {
  name: string;
  passwordHash: string;
}

/**
 * A socketrole defines access to certain routines.
 */
export class SocketRole {
  // STATIC
  public static getSocketRoleByName(
    referenceSmartsocket: Smartsocket | SmartsocketClient,
    socketRoleNameArg: string
  ): SocketRole {
    return referenceSmartsocket.socketRoles.find((socketRoleArg) => {
      return socketRoleArg.name === socketRoleNameArg;
    });
  }

  public static async checkPasswordForRole(
    dataArg: ISocketConnectionAuthenticationObject,
    referenceSmartsocket: Smartsocket | SmartsocketClient
  ): Promise<boolean> {
    const targetPasswordHash = SocketRole.getSocketRoleByName(referenceSmartsocket, dataArg.role)
      .passwordHash;
    const computedCompareHash = await plugins.isohash.sha256FromString(dataArg.password);
    return targetPasswordHash === computedCompareHash;
  }

  // INSTANCE
  public name: string;
  public passwordHash: string;
  public allowedFunctions = new plugins.lik.ObjectMap<SocketFunction<any>>();
  constructor(optionsArg: ISocketRoleOptions) {
    this.name = optionsArg.name;
    this.passwordHash = optionsArg.passwordHash;
  }

  /**
   * adds the socketfunction to the socketrole
   * @param socketFunctionArg
   */
  public addSocketFunction(socketFunctionArg: SocketFunction<any>) {
    this.allowedFunctions.add(socketFunctionArg);
  }
}
