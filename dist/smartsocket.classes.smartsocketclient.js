"use strict";
const plugins = require("./smartsocket.plugins");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
class SmartsocketClient {
    constructor(optionsArg) {
        // TODO: implement Socket init
    }
    ;
    serverCall(functionNameArg, dataArg) {
        let socketRequest = new smartsocket_classes_socketrequest_1.SocketRequest({
            side: "requesting",
            originSocketConnection: this.socketConnection,
            shortId: plugins.shortid.generate(),
            funcCallData: {
                funcName: functionNameArg,
                funcDataArg: dataArg
            }
        });
        socketRequest.dispatch();
    }
}
exports.SmartsocketClient = SmartsocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUl6QixDQUFDLENBSitDO0FBVWhELG9EQUE4QixxQ0FBcUMsQ0FBQyxDQUFBO0FBU3BFO0lBRUksWUFBWSxVQUFvQztRQUM1Qyw4QkFBOEI7SUFDbEMsQ0FBQzs7SUFDRCxVQUFVLENBQUMsZUFBc0IsRUFBQyxPQUEyQjtRQUN6RCxJQUFJLGFBQWEsR0FBRyxJQUFJLGlEQUFhLENBQUM7WUFDbEMsSUFBSSxFQUFDLFlBQVk7WUFDakIsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLGdCQUFnQjtZQUM1QyxPQUFPLEVBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEMsWUFBWSxFQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUMsT0FBTzthQUN0QjtTQUNKLENBQUMsQ0FBQztRQUNILGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0FBRUwsQ0FBQztBQWxCWSx5QkFBaUIsb0JBa0I3QixDQUFBIn0=