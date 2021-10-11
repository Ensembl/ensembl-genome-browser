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

var OutgoingActionType;
(function (OutgoingActionType) {
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
    OutgoingActionType["ZMENU_ENTER"] = "zmenu-enter";
    OutgoingActionType["ZOOM_IN"] = "zoom_in";
    OutgoingActionType["ZOOM_OUT"] = "zoom_out";
})(OutgoingActionType || (OutgoingActionType = {}));
var IncomingActionType;
(function (IncomingActionType) {
    IncomingActionType["GENOME_BROWSER_READY"] = "genome_browser_ready";
    IncomingActionType["CURRENT_POSITION"] = "current_position";
    IncomingActionType["TARGET_POSITION"] = "target_position";
    IncomingActionType["SCROLL_POSITION"] = "scroll_position";
    IncomingActionType["TRACK_SUMMARY"] = "track_summary";
    IncomingActionType["ZMENU_CREATE"] = "zmenu";
    IncomingActionType["ZMENU_REPOSITION"] = "update_zmenu_position";
})(IncomingActionType || (IncomingActionType = {}));
var Markup;
(function (Markup) {
    Markup["STRONG"] = "strong";
    Markup["EMPHASIS"] = "emphasis";
    Markup["FOCUS"] = "focus";
    Markup["LIGHT"] = "light";
})(Markup || (Markup = {}));
var ZmenuFeatureType;
(function (ZmenuFeatureType) {
    ZmenuFeatureType["GENE"] = "gene";
    ZmenuFeatureType["TRANSCRIPT"] = "transcript";
})(ZmenuFeatureType || (ZmenuFeatureType = {}));
var createOutgoingAction = function (action) {
    return __assign({}, action);
};

var subscriptions = new Map();
var EnsemblGenomeBrowser = (function () {
    function EnsemblGenomeBrowser() {
        var _this = this;
        this.genomeBrowser = null;
        this.inited = false;
        this.formatIncoming = function (actionType, payload) {
            if (actionType === IncomingActionType.TRACK_SUMMARY) {
                return {
                    type: actionType,
                    payload: payload.summary
                };
            }
            else if (actionType === IncomingActionType.ZMENU_CREATE) {
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
            var subscriptionsToAction = subscriptions.get(type);
            if (subscriptionsToAction) {
                subscriptionsToAction.forEach(function (subscription) {
                    subscription(_this.formatIncoming(type, payload));
                });
            }
        };
        this.send = function (action) { return __awaiter(_this, void 0, void 0, function () {
            var _a, stick, startBp, endBp, _i, _b, track_id, _c, _d, track_id, _e, _f, track_id, _g, _h, track_id;
            return __generator(this, function (_j) {
                if (!this.genomeBrowser) {
                    return [2];
                }
                if (action.type === OutgoingActionType.SET_FOCUS) {
                    if (!action.payload.focus) {
                        return [2];
                    }
                    this.genomeBrowser.jump("focus:" + action.payload.genomeId + ":" + action.payload.focus);
                    this.genomeBrowser.wait();
                    this.genomeBrowser.set_switch(["track"]);
                    this.genomeBrowser.set_switch(["track", "focus"]);
                    this.genomeBrowser.set_switch(["track", "focus", "label"]);
                    this.genomeBrowser.set_switch(["focus", "gene"]);
                    this.genomeBrowser.set_switch(["focus", "gene", action.payload.focus]);
                }
                if (action.type === OutgoingActionType.SET_FOCUS_LOCATION) {
                    _a = action.payload, stick = _a.stick, startBp = _a.startBp, endBp = _a.endBp;
                    this.genomeBrowser.set_stick(stick);
                    this.genomeBrowser.wait();
                    if (!action.payload.focus) {
                        this.genomeBrowser.jump("focus:" + action.payload.genomeId + ":" + action.payload.focus);
                        this.genomeBrowser.wait();
                    }
                    this.genomeBrowser.goto(startBp, endBp);
                }
                else if (action.type === OutgoingActionType.TURN_ON_TRACKS) {
                    for (_i = 0, _b = action.payload.track_ids; _i < _b.length; _i++) {
                        track_id = _b[_i];
                        this.genomeBrowser.set_switch(["track", track_id]);
                        this.genomeBrowser.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.TURN_OFF_TRACKS) {
                    for (_c = 0, _d = action.payload.track_ids; _c < _d.length; _c++) {
                        track_id = _d[_c];
                        this.genomeBrowser.clear_switch(["track", track_id]);
                        this.genomeBrowser.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.TURN_ON_LABELS) {
                    for (_e = 0, _f = action.payload.track_ids; _e < _f.length; _e++) {
                        track_id = _f[_e];
                        this.genomeBrowser.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.TURN_OFF_LABELS) {
                    for (_g = 0, _h = action.payload.track_ids; _g < _h.length; _g++) {
                        track_id = _h[_g];
                        this.genomeBrowser.clear_switch(["track", track_id, "label"]);
                    }
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
                        return [4, import('./peregrine_ensembl-33b4772f.js')];
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

export default EnsemblGenomeBrowser;
export { IncomingActionType, Markup, OutgoingActionType, ZmenuFeatureType, createOutgoingAction };
