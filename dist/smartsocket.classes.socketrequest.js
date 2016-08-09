"use strict";
// import classes
const lik_1 = require("lik");
;
//export objects
exports.allRequestingSocketRequests = new lik_1.Objectmap();
exports.allRespondingSocketRequests = new lik_1.Objectmap();
// export classes
class SocketRequest {
    constructor(optionsArg) {
        this.status = "new";
        this.side = optionsArg.side;
        this.shortid = optionsArg.shortid;
        if (this.side === "requesting") {
            exports.allRequestingSocketRequests.add(this);
        }
        else {
            exports.allRespondingSocketRequests.add(this);
        }
        ;
    }
    ;
    respond(dataArg) {
    }
    _dispatch() {
    }
}
exports.SocketRequest = SocketRequest;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRyZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxpQkFBaUI7QUFDakIsc0JBQTBCLEtBQUssQ0FBQyxDQUFBO0FBVS9CLENBQUM7QUFFRixnQkFBZ0I7QUFDTCxtQ0FBMkIsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQztBQUM3RCxtQ0FBMkIsR0FBRyxJQUFJLGVBQVMsRUFBaUIsQ0FBQztBQUV4RSxpQkFBaUI7QUFDakI7SUFJSSxZQUFZLFVBQTJDO1FBSHZELFdBQU0sR0FBeUIsS0FBSyxDQUFDO1FBSWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDbEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQSxDQUFDO1lBQzNCLG1DQUEyQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixtQ0FBMkIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUFBLENBQUM7SUFDTixDQUFDOztJQUNELE9BQU8sQ0FBQyxPQUFxQztJQUU3QyxDQUFDO0lBQ08sU0FBUztJQUVqQixDQUFDO0FBQ0wsQ0FBQztBQW5CWSxxQkFBYSxnQkFtQnpCLENBQUE7QUFBQSxDQUFDIn0=