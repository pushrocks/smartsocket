"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketRole = void 0;
const plugins = __importStar(require("./smartsocket.plugins"));
/**
 * A socketrole defines access to certain routines.
 */
class SocketRole {
    constructor(optionsArg) {
        this.allowedFunctions = new plugins.lik.ObjectMap();
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
    }
    // STATIC
    static getSocketRoleByName(referenceSmartsocket, socketRoleNameArg) {
        return referenceSmartsocket.socketRoles.find(socketRoleArg => {
            return socketRoleArg.name === socketRoleNameArg;
        });
    }
    static checkPasswordForRole(dataArg, referenceSmartsocket) {
        const targetPasswordHash = SocketRole.getSocketRoleByName(referenceSmartsocket, dataArg.role)
            .passwordHash;
        const computedCompareHash = plugins.smarthash.sha256FromStringSync(dataArg.password);
        return targetPasswordHash === computedCompareHash;
    }
    /**
     * adds the socketfunction to the socketrole
     * @param socketFunctionArg
     */
    addSocketFunction(socketFunctionArg) {
        this.allowedFunctions.add(socketFunctionArg);
    }
}
exports.SocketRole = SocketRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBaUQ7QUFnQmpEOztHQUVHO0FBQ0gsTUFBYSxVQUFVO0lBeUJyQixZQUFZLFVBQThCO1FBRG5DLHFCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQXVCLENBQUM7UUFFekUsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztJQUM5QyxDQUFDO0lBM0JELFNBQVM7SUFDRixNQUFNLENBQUMsbUJBQW1CLENBQy9CLG9CQUFxRCxFQUNyRCxpQkFBeUI7UUFFekIsT0FBTyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzNELE9BQU8sYUFBYSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsb0JBQW9CLENBQ2hDLE9BQThDLEVBQzlDLG9CQUFxRDtRQUVyRCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQzFGLFlBQVksQ0FBQztRQUNoQixNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sa0JBQWtCLEtBQUssbUJBQW1CLENBQUM7SUFDcEQsQ0FBQztJQVdEOzs7T0FHRztJQUNJLGlCQUFpQixDQUFDLGlCQUFzQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNGO0FBckNELGdDQXFDQyJ9