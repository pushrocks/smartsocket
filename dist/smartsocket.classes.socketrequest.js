"use strict";
const plugins = require("./smartsocket.plugins");
// import classes
const lik_1 = require("lik");
;
;
//export objects
exports.allRequestingSocketRequests = new lik_1.Objectmap();
exports.allRespondingSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = "new";
        this.done = plugins.q.defer();
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortId;
        if (this.side === "requesting") {
            exports.allRequestingSocketRequests.add(this);
        }
        else {
            exports.allRespondingSocketRequests.add(this);
        }
        ;
        // build request and response dataArg
        this.requestData = {
            funcCallData: optionsArg.funcCallData,
            shortId: optionsArg.shortId
        };
    }
    ;
    dispatch() {
        this.originSocketConnection.socket.emit("function", this.requestData);
        return this.done.promise;
    }
    ;
    handleResponse(responseDataArg) {
        this.done.resolve(responseDataArg);
    }
    respond(dataArg) {
    }
    ;
}
exports.SocketRequest = SocketRequest;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBS2pELGlCQUFpQjtBQUNqQixzQkFBMEIsS0FBSyxDQUFDLENBQUE7QUFnQi9CLENBQUM7QUFTRCxDQUFDO0FBRUYsZ0JBQWdCO0FBQ0wsbUNBQTJCLEdBQUcsSUFBSSxlQUFTLEVBQWlCLENBQUM7QUFDN0QsbUNBQTJCLEdBQUcsSUFBSSxlQUFTLEVBQWlCLENBQUM7QUFFeEUsaUJBQWlCO0FBQ2pCO0lBT0ksWUFBWSxVQUEyQztRQU52RCxXQUFNLEdBQXlCLEtBQUssQ0FBQztRQUtyQyxTQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUEsQ0FBQztZQUMzQixtQ0FBMkIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osbUNBQTJCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFBQSxDQUFDO1FBQ0YscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDZixZQUFZLEVBQUMsVUFBVSxDQUFDLFlBQVk7WUFDcEMsT0FBTyxFQUFDLFVBQVUsQ0FBQyxPQUFPO1NBQzdCLENBQUE7SUFDTCxDQUFDOztJQUNELFFBQVE7UUFDSixJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDOztJQUNELGNBQWMsQ0FBQyxlQUF3QztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsT0FBTyxDQUFDLE9BQU87SUFFZixDQUFDOztBQUNMLENBQUM7QUEvQlkscUJBQWEsZ0JBK0J6QixDQUFBO0FBQUEsQ0FBQyJ9