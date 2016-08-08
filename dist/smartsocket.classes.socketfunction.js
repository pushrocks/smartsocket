"use strict";
;
;
class SocketFunction {
    constructor(optionsArg) {
        this.name = optionsArg.name;
        this.func = optionsArg.func;
        this.roles = optionsArg.roles;
        for (let socketRoleArg of this.roles) {
            this._notifyRole(socketRoleArg);
        }
    }
    ;
    _notifyRole(socketRoleArg) {
        socketRoleArg.addSocketFunction(this);
    }
    functionRequest(dataArg) {
    }
}
exports.SocketFunction = SocketFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVVDLENBQUM7QUFNRCxDQUFDO0FBRUY7SUFJSSxZQUFZLFVBQWlDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUM7O0lBQ08sV0FBVyxDQUFDLGFBQXdCO1FBQ3hDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsZUFBZSxDQUFDLE9BQTJCO0lBRTNDLENBQUM7QUFDTCxDQUFDO0FBbEJZLHNCQUFjLGlCQWtCMUIsQ0FBQSJ9