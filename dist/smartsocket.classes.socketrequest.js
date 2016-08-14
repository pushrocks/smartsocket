"use strict";
const plugins = require("./smartsocket.plugins");
const helpers = require("./smartsocket.helpers");
// import classes
const lik_1 = require("lik");
;
;
//export objects
exports.allSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = "new";
        this.done = plugins.q.defer();
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        this.funcCallData = optionsArg.funcCallData;
        this.originSocketConnection = optionsArg.originSocketConnection;
        exports.allSocketRequests.add(this);
    }
    ;
    // requesting --------------------------
    /**
     * dispatches a socketrequest from the requesting to the receiving side
     */
    dispatch() {
        let requestData = {
            funcCallData: this.funcCallData,
            shortId: this.shortid
        };
        this.originSocketConnection.socket.emit("function", requestData);
        return this.done.promise;
    }
    ;
    /**
     * handles the response that is received by the requesting side
     */
    handleResponse(responseDataArg) {
        plugins.beautylog.log("handling response!");
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
            plugins.beautylog.log("got resultData. Sending it to requesting party.");
            let requestData = {
                funcCallData: resultData,
                shortId: this.shortid
            };
            this.originSocketConnection.socket.emit("functionResponse", requestData);
            exports.allSocketRequests.remove(this);
        });
    }
}
exports.SocketRequest = SocketRequest;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFLakQsaUJBQWlCO0FBQ2pCLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQWdCL0IsQ0FBQztBQVNELENBQUM7QUFFRixnQkFBZ0I7QUFDTCx5QkFBaUIsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQztBQUU5RCxpQkFBaUI7QUFDakI7SUFPSSxZQUFZLFVBQTJDO1FBTnZELFdBQU0sR0FBeUIsS0FBSyxDQUFDO1FBS3JDLFNBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLENBQUMsc0JBQXNCLENBQUM7UUFDaEUseUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O0lBRUQsd0NBQXdDO0lBRXhDOztPQUVHO0lBQ0gsUUFBUTtRQUNKLElBQUksV0FBVyxHQUE2QjtZQUN4QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3hCLENBQUE7UUFDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7O0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsZUFBeUM7UUFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQseUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3Q0FBd0M7SUFFeEM7O09BRUc7SUFDSCxjQUFjO1FBQ1YsSUFBSSxvQkFBb0IsR0FBbUIsT0FBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3pDLElBQUksQ0FBQyxDQUFDLFVBQVU7WUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsQ0FBQyxDQUFBO1lBQ3hFLElBQUksV0FBVyxHQUE2QjtnQkFDeEMsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN4QixDQUFDO1lBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUMsV0FBVyxDQUFDLENBQUM7WUFDeEUseUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztBQUNMLENBQUM7QUF6RFkscUJBQWEsZ0JBeUR6QixDQUFBO0FBQUEsQ0FBQyJ9