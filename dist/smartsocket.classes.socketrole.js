"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import classes
const lik_1 = require("lik");
/**
 * A socketrole defines access to certain routines.
 */
class SocketRole {
    constructor(optionsArg) {
        this.allowedFunctions = new lik_1.Objectmap();
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
    }
    ;
    addSocketFunction(socketFunctionArg) {
        this.allowedFunctions.add(socketFunctionArg);
    }
}
exports.SocketRole = SocketRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsaUJBQWlCO0FBQ2pCLDZCQUFnQztBQVloQzs7R0FFRztBQUNIO0lBSUksWUFBWSxVQUE2QjtRQUR6QyxxQkFBZ0IsR0FBRyxJQUFJLGVBQVMsRUFBa0IsQ0FBQztRQUUvQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQ2hELENBQUM7SUFBQSxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsaUJBQWdDO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0o7QUFYRCxnQ0FXQyJ9