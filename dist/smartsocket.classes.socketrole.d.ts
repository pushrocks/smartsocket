/**
 * interface for class SocketRole
 */
export interface SocketRoleOptions {
    name: string;
    passwordHash: string;
}
/**
 * A socketrole defines access to certain routines.
 */
export declare class SocketRole {
    name: string;
    passwordHash: string;
    constructor(optionsArg: SocketRoleOptions);
}
