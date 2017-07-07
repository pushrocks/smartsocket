"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
// import classes
const lik_1 = require("lik");
// export objects
exports.allSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = 'new';
        this.done = plugins.smartq.defer();
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        this.funcCallData = optionsArg.funcCallData;
        this.originSocketConnection = optionsArg.originSocketConnection;
        exports.allSocketRequests.add(this);
    }
    // requesting --------------------------
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch() {
        let requestData = {
            funcCallData: this.funcCallData,
            shortId: this.shortid
        };
        this.originSocketConnection.socket.emit('function', requestData);
        return this.done.promise;
    }
    /**
     * handles the response that is received by the requesting side
     */
    handleResponse(responseDataArg) {
        plugins.beautylog.log('handling response!');
        this.done.resolve(responseDataArg.funcCallData);
        exports.allSocketRequests.remove(this);
    }
    // responding --------------------------
    /**
     * creates the response on the responding side
     */
    createResponse() {
        let targetSocketFunction = helpers.getSocketFunctionByName(this.funcCallData.funcName);
        plugins.beautylog.info(`invoking ${targetSocketFunction.name}`);
        targetSocketFunction.invoke(this.funcCallData)
            .then((resultData) => {
            plugins.beautylog.log('got resultData. Sending it to requesting party.');
            let requestData = {
                funcCallData: resultData,
                shortId: this.shortid
            };
            this.originSocketConnection.socket.emit('functionResponse', requestData);
            exports.allSocketRequests.remove(this);
        });
    }
}
exports.SocketRequest = SocketRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWdEO0FBQ2hELGlEQUFnRDtBQUtoRCxpQkFBaUI7QUFDakIsNkJBQStCO0FBMkIvQixpQkFBaUI7QUFDTixRQUFBLGlCQUFpQixHQUFHLElBQUksZUFBUyxFQUFpQixDQUFBO0FBRTdELGlCQUFpQjtBQUNqQjtJQU9FLFlBQWEsVUFBMkM7UUFOeEQsV0FBTSxHQUF5QixLQUFLLENBQUE7UUFLcEMsU0FBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFFM0IsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUE7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQTtRQUMvRCx5QkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVELHdDQUF3QztJQUV4Qzs7T0FFRztJQUNILFFBQVE7UUFDTixJQUFJLFdBQVcsR0FBNkI7WUFDMUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QixDQUFBO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUUsZUFBeUM7UUFDdkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDL0MseUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRCx3Q0FBd0M7SUFFeEM7O09BRUc7SUFDSCxjQUFjO1FBQ1osSUFBSSxvQkFBb0IsR0FBbUIsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDdEcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQzNDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO1lBQ3hFLElBQUksV0FBVyxHQUE2QjtnQkFDMUMsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QixDQUFBO1lBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUE7WUFDeEUseUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNGO0FBekRELHNDQXlEQyJ9