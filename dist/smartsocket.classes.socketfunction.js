"use strict";
;
;
;
// export classes
/**
 * class SocketFunction respresents a function that can be transparently called using a SocketConnection
 */
class SocketFunction {
    /**
     * the constructor for SocketFunction
     */
    constructor(optionsArg) {
        this.name = optionsArg.name;
        this.func = optionsArg.func;
        this.roles = optionsArg.roles;
        for (let socketRoleArg of this.roles) {
            this._notifyRole(socketRoleArg);
        }
    }
    ;
    /**
     * notifies a role about access to this SocketFunction
     */
    _notifyRole(socketRoleArg) {
        socketRoleArg.addSocketFunction(this);
    }
    /**
     * invokes the function of this SocketFunction
     */
    invoke(dataArg) {
    }
    ;
}
exports.SocketFunction = SocketFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zb2NrZXRmdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc29ja2V0ZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFDLENBQUM7QUFLRCxDQUFDO0FBTUQsQ0FBQztBQUVGLGlCQUFpQjtBQUVqQjs7R0FFRztBQUNIO0lBS0k7O09BRUc7SUFDSCxZQUFZLFVBQWlDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNMLENBQUM7O0lBRUQ7O09BRUc7SUFDSyxXQUFXLENBQUMsYUFBd0I7UUFDeEMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFvQztJQUUzQyxDQUFDOztBQUVMLENBQUM7QUEvQlksc0JBQWMsaUJBK0IxQixDQUFBIn0=