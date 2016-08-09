"use strict";
// import classes
const lik_1 = require("lik");
exports.allSocketRoles = new lik_1.Objectmap();
/**
 * A socketrole defines access to certain routines.
 */
class SocketRole {
    constructor(optionsArg) {
        this.allowedFunctions = new lik_1.Objectmap();
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
        exports.allSocketRoles.add(this);
    }
    ;
    addSocketFunction(socketFunctionArg) {
        this.allowedFunctions.add(socketFunctionArg);
    }
}
exports.SocketRole = SocketRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxpQkFBaUI7QUFDakIsc0JBQTBCLEtBQUssQ0FBQyxDQUFBO0FBSXJCLHNCQUFjLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQztBQVd4RDs7R0FFRztBQUNIO0lBSUksWUFBWSxVQUE2QjtRQUR6QyxxQkFBZ0IsR0FBRyxJQUFJLGVBQVMsRUFBa0IsQ0FBQztRQUUvQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQzVDLHNCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O0lBQ0QsaUJBQWlCLENBQUMsaUJBQWdDO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0FBQ0wsQ0FBQztBQVpZLGtCQUFVLGFBWXRCLENBQUEifQ==