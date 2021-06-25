"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var restApi_1 = require("../apis/restApi");
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var CloudZigbeeUIID1000Controller = /** @class */ (function (_super) {
    __extends(CloudZigbeeUIID1000Controller, _super);
    function CloudZigbeeUIID1000Controller(props) {
        var _this = _super.call(this, props) || this;
        _this.type = 8;
        _this.uiid = props.extra.uiid;
        _this.entityId = "sensor." + _this.deviceId;
        _this.params = props.params;
        return _this;
    }
    return CloudZigbeeUIID1000Controller;
}(CloudDeviceController_1.default));
/**
 * @description 更新状态到HA
 */
CloudZigbeeUIID1000Controller.prototype.updateState = function (_a) {
    var key = _a.key, battery = _a.battery;
    return __awaiter(this, void 0, void 0, function () {
        var state, keyMap;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (this.disabled) {
                        return [2 /*return*/];
                    }
                    state = "" + key;
                    if (!this.online) {
                        state = 'unavailable';
                    }
                    keyMap = new Map([
                        ['0', 'Click'],
                        ['1', 'Double Click'],
                        ['2', 'Long Press'],
                        ['unavailable', 'unavailable'],
                    ]);
                    if (!(key !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, restApi_1.updateStates("" + this.entityId, {
                            entity_id: "" + this.entityId,
                            state: keyMap.get(state),
                            attributes: {
                                restored: false,
                                friendly_name: "" + this.deviceName,
                                icon: 'mdi:remote',
                                state: state,
                            },
                        })];
                case 1:
                    _b.sent();
                    setTimeout(function () {
                        restApi_1.updateStates("" + _this.entityId, {
                            entity_id: "" + _this.entityId,
                            state: 'None',
                            attributes: {
                                restored: false,
                                friendly_name: "" + _this.deviceName,
                                icon: 'mdi:remote',
                                state: 'None',
                            },
                        });
                    }, 1000);
                    _b.label = 2;
                case 2:
                    if (battery !== undefined) {
                        // 更新电量
                        restApi_1.updateStates(this.entityId + "_battery", {
                            entity_id: this.entityId + "_battery",
                            state: battery,
                            attributes: {
                                restored: false,
                                friendly_name: this.deviceName + "-Battery",
                                device_class: 'battery',
                                unit_of_measurement: '%',
                                state: battery,
                            },
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = CloudZigbeeUIID1000Controller;