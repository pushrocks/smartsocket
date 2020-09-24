"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIoClient = exports.socketIo = exports.smartrx = exports.smartunique = exports.smarttime = exports.smartpromise = exports.smartexpress = exports.smartdelay = exports.smarthash = exports.smartlog = exports.lik = exports.typedrequestInterfaces = void 0;
// apiglobal scope
const typedrequestInterfaces = __importStar(require("@apiglobal/typedrequest-interfaces"));
exports.typedrequestInterfaces = typedrequestInterfaces;
// pushrocks scope
const lik = __importStar(require("@pushrocks/lik"));
exports.lik = lik;
const smartlog = __importStar(require("@pushrocks/smartlog"));
exports.smartlog = smartlog;
const smarthash = __importStar(require("@pushrocks/smarthash"));
exports.smarthash = smarthash;
const smartdelay = __importStar(require("@pushrocks/smartdelay"));
exports.smartdelay = smartdelay;
const smartexpress = __importStar(require("@pushrocks/smartexpress"));
exports.smartexpress = smartexpress;
const smartpromise = __importStar(require("@pushrocks/smartpromise"));
exports.smartpromise = smartpromise;
const smarttime = __importStar(require("@pushrocks/smarttime"));
exports.smarttime = smarttime;
const smartunique = __importStar(require("@pushrocks/smartunique"));
exports.smartunique = smartunique;
const smartrx = __importStar(require("@pushrocks/smartrx"));
exports.smartrx = smartrx;
// third party scope
const socket_io_1 = __importDefault(require("socket.io"));
exports.socketIo = socket_io_1.default;
const socket_io_client_1 = __importDefault(require("socket.io-client"));
exports.socketIoClient = socket_io_client_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRzb2NrZXQucGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0c29ja2V0LnBsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtCQUFrQjtBQUNsQiwyRkFBNkU7QUFFckUsd0RBQXNCO0FBRTlCLGtCQUFrQjtBQUNsQixvREFBc0M7QUFZcEMsa0JBQUc7QUFYTCw4REFBZ0Q7QUFZOUMsNEJBQVE7QUFYVixnRUFBa0Q7QUFZaEQsOEJBQVM7QUFYWCxrRUFBb0Q7QUFZbEQsZ0NBQVU7QUFYWixzRUFBd0Q7QUFZdEQsb0NBQVk7QUFYZCxzRUFBd0Q7QUFZdEQsb0NBQVk7QUFYZCxnRUFBa0Q7QUFZaEQsOEJBQVM7QUFYWCxvRUFBc0Q7QUFZcEQsa0NBQVc7QUFYYiw0REFBOEM7QUFZNUMsMEJBQU87QUFHVCxvQkFBb0I7QUFDcEIsMERBQWlDO0FBSS9CLG1CQUpLLG1CQUFRLENBSUw7QUFIVix3RUFBOEM7QUFJNUMseUJBSkssMEJBQWMsQ0FJTCJ9