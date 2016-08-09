"use strict";
const plugins = require("./smartsocket.plugins");
class SmartsocketClient {
    constructor() {
    }
    dispatchFunctionRequest(dataArg) {
        let done = plugins.q.defer();
        let responseData;
        done.resolve(responseData);
        return done.promise;
    }
    ;
}
exports.SmartsocketClient = SmartsocketClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldGNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXRjbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUl6QixDQUFDLENBSitDO0FBaUJoRDtJQUNJO0lBRUEsQ0FBQztJQUNELHVCQUF1QixDQUFDLE9BQW9DO1FBQ3hELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFpQyxDQUFDO1FBQzVELElBQUksWUFBMEMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7O0FBQ0wsQ0FBQztBQVZZLHlCQUFpQixvQkFVN0IsQ0FBQSJ9