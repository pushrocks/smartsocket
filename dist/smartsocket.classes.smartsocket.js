"use strict";
const plugins = require("./smartsocket.plugins");
// classes
const lik_1 = require("lik");
;
class Smartsocket {
    constructor(options) {
        this.openSockets = new lik_1.Objectmap();
        this.closeServer = () => {
            this.io.close();
            this.openSockets.forEach((socketObjectArg) => {
                socketObjectArg.socket.disconnect();
            });
            this.openSockets.wipe();
        };
        this.io = plugins.socketIo(options.port);
        this.io.on('connection', (socket) => {
            let socketObject = {
                socket: socket,
                authenticated: false
            };
            this.openSockets.add(socketObject);
            this.authenticateSocket(socketObject);
        });
    }
    ;
    authenticateSocket(socketObjectArg) {
        let done = plugins.q.defer();
        socketObjectArg.socket.on("dataAuth", data => {
            socketObjectArg.socket.removeListener("dataAuth", () => { });
            done.resolve();
        });
        socketObjectArg.socket.emit("requestAuth");
        return done.promise;
    }
    ;
}
exports.Smartsocket = Smartsocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQuY2xhc3Nlcy5zbWFydHNvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LmNsYXNzZXMuc21hcnRzb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksT0FBTyxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFHakQsVUFBVTtBQUNWLHNCQUEwQixLQUFLLENBQUMsQ0FBQTtBQUsvQixDQUFDO0FBT0Y7SUFHSSxZQUFZLE9BQXVDO1FBRG5ELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQUUsQ0FBQztRQXNCOUIsZ0JBQVcsR0FBRztZQUNWLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUE4QjtnQkFDcEQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFBO1FBMUJHLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTTtZQUM1QixJQUFJLFlBQVksR0FBa0I7Z0JBQzlCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLGFBQWEsRUFBRSxLQUFLO2FBQ3ZCLENBQUM7WUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztJQUVELGtCQUFrQixDQUFDLGVBQThCO1FBQzdDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUk7WUFDdEMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7QUFRTCxDQUFDO0FBL0JZLG1CQUFXLGNBK0J2QixDQUFBIn0=