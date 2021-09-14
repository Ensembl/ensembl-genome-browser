'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

exports.Markup = void 0;
(function (Markup) {
    Markup["STRONG"] = "strong";
    Markup["EMPHASIS"] = "emphasis";
    Markup["FOCUS"] = "focus";
    Markup["LIGHT"] = "light";
})(exports.Markup || (exports.Markup = {}));
exports.ZmenuFeatureType = void 0;
(function (ZmenuFeatureType) {
    ZmenuFeatureType["GENE"] = "gene";
    ZmenuFeatureType["TRANSCRIPT"] = "transcript";
})(exports.ZmenuFeatureType || (exports.ZmenuFeatureType = {}));
exports.OutgoingActionType = void 0;
(function (OutgoingActionType) {
    OutgoingActionType["PING"] = "ping";
    OutgoingActionType["ACTIVATE_BROWSER"] = "activate_browser";
    OutgoingActionType["MOVE_DOWN"] = "move_down";
    OutgoingActionType["MOVE_LEFT"] = "move_left";
    OutgoingActionType["MOVE_RIGHT"] = "move_right";
    OutgoingActionType["MOVE_UP"] = "move_up";
    OutgoingActionType["SET_FOCUS"] = "set_focus";
    OutgoingActionType["SET_FOCUS_LOCATION"] = "set_focus_location";
    OutgoingActionType["TOGGLE_TRACKS"] = "toggle_tracks";
    OutgoingActionType["TURN_ON_TRACKS"] = "turn_on_tracks";
    OutgoingActionType["TURN_OFF_TRACKS"] = "turn_off_tracks";
    OutgoingActionType["TURN_ON_LABELS"] = "turn_on_labels";
    OutgoingActionType["TURN_OFF_LABELS"] = "turn_off_labels";
    OutgoingActionType["ZMENU_ACTIVITY_OUTSIDE"] = "zmenu-activity-outside";
    OutgoingActionType["ZMENU_ENTER"] = "zmenu-enter";
    OutgoingActionType["ZMENU_LEAVE"] = "zmenu-leave";
    OutgoingActionType["ZOOM_IN"] = "zoom_in";
    OutgoingActionType["ZOOM_OUT"] = "zoom_out";
})(exports.OutgoingActionType || (exports.OutgoingActionType = {}));
exports.IncomingActionType = void 0;
(function (IncomingActionType) {
    IncomingActionType["GENOME_BROWSER_READY"] = "genome_browser_ready";
    IncomingActionType["CURRENT_POSITION"] = "current_position";
    IncomingActionType["TARGET_POSITION"] = "target_position";
    IncomingActionType["SCROLL_POSITION"] = "scroll_position";
    IncomingActionType["TRACK_SUMMARY"] = "track_summary";
    IncomingActionType["ZMENU_CREATE"] = "zmenu";
    IncomingActionType["ZMENU_DESTROY"] = "destroy_zmenu";
    IncomingActionType["ZMENU_REPOSITION"] = "update_zmenu_position";
})(exports.IncomingActionType || (exports.IncomingActionType = {}));
var createOutgoingAction = function (action) {
    return __assign({}, action);
};

var subscriptions = new Map();
var EnsemblGenomeBrowser = (function () {
    function EnsemblGenomeBrowser() {
        var _this = this;
        this.genomeBrowser = null;
        this.bpPerScreen = 1000000;
        this.x = 2500000;
        this.y = 0;
        this.inited = false;
        this.formatIncoming = function (actionType, payload) {
            if (actionType === exports.IncomingActionType.TRACK_SUMMARY) {
                return {
                    type: actionType,
                    payload: payload.summary
                };
            }
            else if (actionType === exports.IncomingActionType.ZMENU_CREATE) {
                var id = payload.content[0].metadata.transcript_id;
                var unversioned_id = id.split('.')[0];
                return {
                    type: actionType,
                    payload: {
                        id: id,
                        unversioned_id: unversioned_id,
                        anchor_coordinates: { x: payload.x, y: payload.y },
                        content: payload.content
                    }
                };
            }
            return {
                type: actionType,
                payload: payload
            };
        };
        this.handleIncoming = function () {
            var action = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                action[_i] = arguments[_i];
            }
            var type = action[0], payload = action[1];
            console.log("INCOMING", type, payload);
            var subscriptionsToAction = subscriptions.get(type);
            if (subscriptionsToAction) {
                subscriptionsToAction.forEach(function (subscription) {
                    subscription(_this.formatIncoming(type, payload));
                });
            }
        };
        this.send = function (action) { return __awaiter(_this, void 0, void 0, function () {
            var _a, stick, startBp, endBp, _i, _b, track_id, _c, _d, track_id, _e, _f, track_id, _g, _h, track_id;
            var _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
            return __generator(this, function (_6) {
                console.log("SEND", action);
                if (action.type === exports.OutgoingActionType.SET_FOCUS) {
                    if (!action.payload.focus) {
                        return [2];
                    }
                    (_j = this.genomeBrowser) === null || _j === void 0 ? void 0 : _j.jump("focus:" + action.payload.genomeId + ":" + action.payload.focus);
                    (_k = this.genomeBrowser) === null || _k === void 0 ? void 0 : _k.wait();
                    (_l = this.genomeBrowser) === null || _l === void 0 ? void 0 : _l.set_switch(["track"]);
                    (_m = this.genomeBrowser) === null || _m === void 0 ? void 0 : _m.set_switch(["track", "focus"]);
                    (_o = this.genomeBrowser) === null || _o === void 0 ? void 0 : _o.set_switch(["track", "focus", "label"]);
                    (_p = this.genomeBrowser) === null || _p === void 0 ? void 0 : _p.set_switch(["focus", "gene"]);
                    (_q = this.genomeBrowser) === null || _q === void 0 ? void 0 : _q.set_switch(["focus", "gene", action.payload.focus]);
                }
                if (action.type === exports.OutgoingActionType.SET_FOCUS_LOCATION) {
                    _a = action.payload, stick = _a.stick, startBp = _a.startBp, endBp = _a.endBp;
                    (_r = this.genomeBrowser) === null || _r === void 0 ? void 0 : _r.set_stick(stick);
                    (_s = this.genomeBrowser) === null || _s === void 0 ? void 0 : _s.wait();
                    (_t = this.genomeBrowser) === null || _t === void 0 ? void 0 : _t.goto(startBp, endBp);
                    this.x = startBp;
                    this.bpPerScreen = endBp - startBp;
                }
                else if (action.type === exports.OutgoingActionType.TURN_ON_TRACKS) {
                    for (_i = 0, _b = action.payload.track_ids; _i < _b.length; _i++) {
                        track_id = _b[_i];
                        (_u = this.genomeBrowser) === null || _u === void 0 ? void 0 : _u.set_switch(["track", track_id]);
                        (_v = this.genomeBrowser) === null || _v === void 0 ? void 0 : _v.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === exports.OutgoingActionType.TURN_OFF_TRACKS) {
                    for (_c = 0, _d = action.payload.track_ids; _c < _d.length; _c++) {
                        track_id = _d[_c];
                        (_w = this.genomeBrowser) === null || _w === void 0 ? void 0 : _w.clear_switch(["track", track_id]);
                        (_x = this.genomeBrowser) === null || _x === void 0 ? void 0 : _x.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === exports.OutgoingActionType.TURN_ON_LABELS) {
                    for (_e = 0, _f = action.payload.track_ids; _e < _f.length; _e++) {
                        track_id = _f[_e];
                        (_y = this.genomeBrowser) === null || _y === void 0 ? void 0 : _y.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === exports.OutgoingActionType.TURN_OFF_LABELS) {
                    for (_g = 0, _h = action.payload.track_ids; _g < _h.length; _g++) {
                        track_id = _h[_g];
                        (_z = this.genomeBrowser) === null || _z === void 0 ? void 0 : _z.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === exports.OutgoingActionType.ZOOM_IN) {
                    this.bpPerScreen = this.bpPerScreen - 10000;
                    (_0 = this.genomeBrowser) === null || _0 === void 0 ? void 0 : _0.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === exports.OutgoingActionType.ZOOM_OUT) {
                    this.bpPerScreen = this.bpPerScreen + 10000;
                    (_1 = this.genomeBrowser) === null || _1 === void 0 ? void 0 : _1.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === exports.OutgoingActionType.MOVE_LEFT) {
                    this.x = this.x + 10000;
                    (_2 = this.genomeBrowser) === null || _2 === void 0 ? void 0 : _2.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === exports.OutgoingActionType.MOVE_RIGHT) {
                    this.x = this.x - 10000;
                    (_3 = this.genomeBrowser) === null || _3 === void 0 ? void 0 : _3.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === exports.OutgoingActionType.MOVE_UP) {
                    this.y = this.y + 10;
                    (_4 = this.genomeBrowser) === null || _4 === void 0 ? void 0 : _4.set_y(this.y);
                }
                else if (action.type === exports.OutgoingActionType.MOVE_DOWN) {
                    this.y = this.y - 10;
                    (_5 = this.genomeBrowser) === null || _5 === void 0 ? void 0 : _5.set_y(this.y);
                }
                return [2];
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
                        (_a = subscriptions.get(actionType)) === null || _a === void 0 ? void 0 : _a["delete"](callback);
                    });
                }
            };
        };
    }
    EnsemblGenomeBrowser.prototype.init = function (config) {
        var _a, _b;
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, init, GenomeBrowser;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.inited) return [3, 3];
                        return [4, Promise.resolve().then(function () { return require('./peregrine_ensembl-c0777ab0.js'); })];
                    case 1:
                        _c = _d.sent(), init = _c["default"], GenomeBrowser = _c.GenomeBrowser;
                        return [4, init()];
                    case 2:
                        _d.sent();
                        this.genomeBrowser = new GenomeBrowser();
                        (_a = this.genomeBrowser) === null || _a === void 0 ? void 0 : _a.go(config);
                        _d.label = 3;
                    case 3:
                        this.inited = true;
                        (_b = this.genomeBrowser) === null || _b === void 0 ? void 0 : _b.set_message_reporter(this.handleIncoming);
                        return [2];
                }
            });
        });
    };
    return EnsemblGenomeBrowser;
}());

exports.createOutgoingAction = createOutgoingAction;
exports.default = EnsemblGenomeBrowser;