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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var action_1 = require("./action");
var peregrine_generic_js_1 = __importStar(require("./peregrine/peregrine_generic.js"));
var subscriptions = new Map();
var EnsemblGenomeBrowser = /** @class */ (function () {
    function EnsemblGenomeBrowser() {
        var _this = this;
        this.genomeBrowser = null;
        this.bpPerScreen = 1000000;
        this.x = 2500000;
        this.y = 0;
        this.inited = false;
        this.handleIncoming = function (actionType) {
            var more = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                more[_i - 1] = arguments[_i];
            }
            var subscriptionsToAction = subscriptions.get(actionType);
            if (subscriptionsToAction) {
                console.log(actionType, more);
                subscriptionsToAction.forEach(function (subscription) {
                    subscription({
                        type: actionType,
                        payload: more
                    });
                });
            }
        };
        this.send = function (action) { return __awaiter(_this, void 0, void 0, function () {
            var type, _a, stick, startBp, endBp, _i, _b, track_id, _c, _d, track_id, _e, _f, track_id, _g, _h, track_id;
            var _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
            return __generator(this, function (_0) {
                type = action.type;
                if (type === action_1.OutgoingActionType.ACTIVATE_BROWSER) {
                    this.init();
                    return [2 /*return*/];
                }
                console.log(action);
                if (action.type === action_1.OutgoingActionType.SET_FOCUS) {
                    (_j = this.genomeBrowser) === null || _j === void 0 ? void 0 : _j.set_stick((_k = action.payload) === null || _k === void 0 ? void 0 : _k.focus);
                    // this.genomeBrowser?.set_stick("homo_sapiens_GCA_000001405_27:1");
                }
                if (action.type === action_1.OutgoingActionType.SET_FOCUS_LOCATION) {
                    _a = action.payload, stick = _a.stick, startBp = _a.startBp, endBp = _a.endBp;
                    (_l = this.genomeBrowser) === null || _l === void 0 ? void 0 : _l.set_stick(stick);
                    (_m = this.genomeBrowser) === null || _m === void 0 ? void 0 : _m.goto(startBp, endBp);
                    this.x = startBp;
                    this.bpPerScreen = endBp - startBp;
                }
                else if (action.type === action_1.OutgoingActionType.TURN_ON_TRACKS) {
                    for (_i = 0, _b = action.payload.track_ids; _i < _b.length; _i++) {
                        track_id = _b[_i];
                        (_o = this.genomeBrowser) === null || _o === void 0 ? void 0 : _o.set_switch(["track", track_id]);
                        (_p = this.genomeBrowser) === null || _p === void 0 ? void 0 : _p.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === action_1.OutgoingActionType.TURN_OFF_TRACKS) {
                    for (_c = 0, _d = action.payload.track_ids; _c < _d.length; _c++) {
                        track_id = _d[_c];
                        (_q = this.genomeBrowser) === null || _q === void 0 ? void 0 : _q.clear_switch(["track", track_id]);
                        (_r = this.genomeBrowser) === null || _r === void 0 ? void 0 : _r.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === action_1.OutgoingActionType.TURN_ON_LABELS) {
                    for (_e = 0, _f = action.payload.track_ids; _e < _f.length; _e++) {
                        track_id = _f[_e];
                        (_s = this.genomeBrowser) === null || _s === void 0 ? void 0 : _s.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === action_1.OutgoingActionType.TURN_OFF_LABELS) {
                    for (_g = 0, _h = action.payload.track_ids; _g < _h.length; _g++) {
                        track_id = _h[_g];
                        (_t = this.genomeBrowser) === null || _t === void 0 ? void 0 : _t.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === action_1.OutgoingActionType.ZOOM_IN) {
                    this.bpPerScreen = this.bpPerScreen - 10000;
                    (_u = this.genomeBrowser) === null || _u === void 0 ? void 0 : _u.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === action_1.OutgoingActionType.ZOOM_OUT) {
                    this.bpPerScreen = this.bpPerScreen + 10000;
                    (_v = this.genomeBrowser) === null || _v === void 0 ? void 0 : _v.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === action_1.OutgoingActionType.MOVE_LEFT) {
                    this.x = this.x + 10000;
                    (_w = this.genomeBrowser) === null || _w === void 0 ? void 0 : _w.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === action_1.OutgoingActionType.MOVE_RIGHT) {
                    this.x = this.x - 10000;
                    (_x = this.genomeBrowser) === null || _x === void 0 ? void 0 : _x.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === action_1.OutgoingActionType.MOVE_UP) {
                    this.y = this.y + 10;
                    (_y = this.genomeBrowser) === null || _y === void 0 ? void 0 : _y.set_y(this.y);
                }
                else if (action.type === action_1.OutgoingActionType.MOVE_DOWN) {
                    this.y = this.y - 10;
                    (_z = this.genomeBrowser) === null || _z === void 0 ? void 0 : _z.set_y(this.y);
                }
                return [2 /*return*/];
            });
        }); };
        this.subscribe = function (actionTypes, callback) {
            actionTypes.forEach(function (actionType) {
                var subscriptionsToAction = subscriptions.get(actionType);
                if (subscriptionsToAction) {
                    subscriptionsToAction.add(callback);
                }
                else {
                    subscriptions.set(actionType, new Set([callback]));
                }
            });
            return {
                unsubscribe: function () {
                    actionTypes.forEach(function (actionType) {
                        var _a;
                        (_a = subscriptions.get(actionType)) === null || _a === void 0 ? void 0 : _a.delete(callback);
                    });
                }
            };
        };
    }
    EnsemblGenomeBrowser.prototype.init = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        if (!!this.inited) return [3 /*break*/, 2];
                        return [4 /*yield*/, peregrine_generic_js_1.default()];
                    case 1:
                        _p.sent();
                        this.genomeBrowser = new peregrine_generic_js_1.GenomeBrowser();
                        (_a = this.genomeBrowser) === null || _a === void 0 ? void 0 : _a.go({});
                        _p.label = 2;
                    case 2:
                        this.inited = true;
                        (_b = this.genomeBrowser) === null || _b === void 0 ? void 0 : _b.set_stick("homo_sapiens_GCA_000001405_27:17");
                        (_c = this.genomeBrowser) === null || _c === void 0 ? void 0 : _c.set_switch(["track"]);
                        (_d = this.genomeBrowser) === null || _d === void 0 ? void 0 : _d.set_switch(["track", "gene-pc-fwd"]);
                        (_e = this.genomeBrowser) === null || _e === void 0 ? void 0 : _e.set_switch(["track", "gene-nonpc-fwd"]);
                        (_f = this.genomeBrowser) === null || _f === void 0 ? void 0 : _f.set_switch(["track", "gene-nonpc-rev"]);
                        (_g = this.genomeBrowser) === null || _g === void 0 ? void 0 : _g.set_switch(["track", "gene-nonpc-fwd", "label"]);
                        (_h = this.genomeBrowser) === null || _h === void 0 ? void 0 : _h.set_switch(["track", "gene-nonpc-rev", "label"]);
                        (_j = this.genomeBrowser) === null || _j === void 0 ? void 0 : _j.set_switch(["track", "gc"]);
                        (_k = this.genomeBrowser) === null || _k === void 0 ? void 0 : _k.set_switch(["track", "contig"]);
                        (_l = this.genomeBrowser) === null || _l === void 0 ? void 0 : _l.goto(2000000, 3000000);
                        (_m = this.genomeBrowser) === null || _m === void 0 ? void 0 : _m.set_switch(["settings"]);
                        (_o = this.genomeBrowser) === null || _o === void 0 ? void 0 : _o.set_message_reporter(this.handleIncoming);
                        return [2 /*return*/];
                }
            });
        });
    };
    return EnsemblGenomeBrowser;
}());
exports.default = EnsemblGenomeBrowser;
