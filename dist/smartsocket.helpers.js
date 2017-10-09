"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
const smartsocket_classes_socketfunction_1 = require("./smartsocket.classes.socketfunction");
const smartsocket_classes_socketrequest_1 = require("./smartsocket.classes.socketrequest");
// SocketConnection helpers
exports.checkPasswordForRole = (dataArg, referenceSmartsocket) => {
    let targetPasswordHash = exports.getSocketRoleByName(dataArg.role, referenceSmartsocket).passwordHash;
    let computedCompareHash = plugins.nodehash.sha256FromStringSync(dataArg.password);
    return targetPasswordHash === computedCompareHash;
};
// SocketFunction helpers
exports.getSocketFunctionByName = (functionNameArg) => {
    return smartsocket_classes_socketfunction_1.allSocketFunctions.find((socketFunctionArg) => { return socketFunctionArg.name === functionNameArg; });
};
// SocketRequest helpers
/**
 * get corresponding Socketrequest instance by shortId
 */
exports.getSocketRequestById = (shortIdArg, requestSide) => {
    return smartsocket_classes_socketrequest_1.allSocketRequests.find((socketRequestArg) => { return socketRequestArg.shortid === shortIdArg; });
};
// SocketRole helpers
/**
 * get corresponding SocketRole instance by name
 */
exports.getSocketRoleByName = (socketRoleNameArg, referenceSmartsocket) => {
    return referenceSmartsocket.socketRoles.find((socketRoleArg) => { return socketRoleArg.name === socketRoleNameArg; });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmhlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFJakQsNkZBQTBGO0FBRTFGLDJGQUEyRztBQUczRywyQkFBMkI7QUFDaEIsUUFBQSxvQkFBb0IsR0FBRyxDQUFDLE9BQThDLEVBQUUsb0JBQWdDLEVBQVcsRUFBRTtJQUM1SCxJQUFJLGtCQUFrQixHQUFHLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDN0YsSUFBSSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRixNQUFNLENBQUMsa0JBQWtCLEtBQUssbUJBQW1CLENBQUM7QUFDdEQsQ0FBQyxDQUFBO0FBR0QseUJBQXlCO0FBQ2QsUUFBQSx1QkFBdUIsR0FBRyxDQUFDLGVBQXVCLEVBQWtCLEVBQUU7SUFDN0UsTUFBTSxDQUFDLHVEQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pILENBQUMsQ0FBQTtBQUVELHdCQUF3QjtBQUV4Qjs7R0FFRztBQUNRLFFBQUEsb0JBQW9CLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFdBQWdDLEVBQWlCLEVBQUU7SUFDdEcsTUFBTSxDQUFDLHFEQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNHLENBQUMsQ0FBQTtBQUVELHFCQUFxQjtBQUVyQjs7R0FFRztBQUNRLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxpQkFBeUIsRUFBQyxvQkFBZ0MsRUFBYyxFQUFFO0lBQ3hHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hILENBQUMsQ0FBQyJ9