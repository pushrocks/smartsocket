"use strict";
/**
 * A socketrole defines access to certain routines.
 */
class SocketRole {
    constructor(optionsArg) {
        this.name = optionsArg.name;
        this.passwordHash = optionsArg.passwordHash;
    }
    ;
    addSocketFunction(socketFunctionArg) {
        this.allowedFunctions.push(socketFunctionArg);
    }
}
exports.SocketRole = SocketRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFjQTs7R0FFRztBQUNIO0lBSUksWUFBWSxVQUE2QjtRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO0lBQ2hELENBQUM7O0lBQ0QsaUJBQWlCLENBQUMsaUJBQWdDO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0FBQ0wsQ0FBQztBQVhZLGtCQUFVLGFBV3RCLENBQUEifQ==