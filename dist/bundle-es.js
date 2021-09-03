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

var Markup;
(function (Markup) {
    Markup["STRONG"] = "strong";
    Markup["EMPHASIS"] = "emphasis";
    Markup["FOCUS"] = "focus";
    Markup["LIGHT"] = "light";
})(Markup || (Markup = {}));
var OutgoingActionType;
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
})(OutgoingActionType || (OutgoingActionType = {}));
var IncomingActionType;
(function (IncomingActionType) {
    IncomingActionType["GENOME_BROWSER_READY"] = "genome_browser_ready";
    IncomingActionType["CURRENT_POSITION"] = "current_position";
    IncomingActionType["TARGET_POSITION"] = "target_position";
    IncomingActionType["SCROLL_POSITION"] = "scroll_position";
    IncomingActionType["TRACK_SUMMARY"] = "track_summary";
    IncomingActionType["ZMENU_CREATE"] = "zmenu";
    IncomingActionType["ZMENU_DESTROY"] = "destroy_zmenu";
    IncomingActionType["ZMENU_REPOSITION"] = "update_zmenu_position";
})(IncomingActionType || (IncomingActionType = {}));

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
            if (actionType === IncomingActionType.TRACK_SUMMARY) {
                return {
                    type: actionType,
                    payload: payload.summary
                };
            }
            else if (actionType === IncomingActionType.ZMENU_CREATE) {
                return {
                    type: actionType,
                    payload: {
                        id: payload.content[0].metadata.transcript_id,
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
            var type, _a, stick, startBp, endBp, _i, _b, track_id, _c, _d, track_id, _e, _f, track_id, _g, _h, track_id;
            var _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
            return __generator(this, function (_3) {
                type = action.type;
                console.log("SEND", action);
                if (type === OutgoingActionType.ACTIVATE_BROWSER) {
                    this.init();
                    return [2];
                }
                if (action.type === OutgoingActionType.SET_FOCUS) {
                    if (!action.payload.focus) {
                        return [2];
                    }
                    (_j = this.genomeBrowser) === null || _j === void 0 ? void 0 : _j.jump("focus:" + action.payload.genomeId + ":" + action.payload.focus);
                    (_k = this.genomeBrowser) === null || _k === void 0 ? void 0 : _k.wait();
                    (_l = this.genomeBrowser) === null || _l === void 0 ? void 0 : _l.set_switch(["focus", "gene"]);
                    (_m = this.genomeBrowser) === null || _m === void 0 ? void 0 : _m.set_switch(["focus", "gene", action.payload.focus]);
                }
                if (action.type === OutgoingActionType.SET_FOCUS_LOCATION) {
                    _a = action.payload, stick = _a.stick, startBp = _a.startBp, endBp = _a.endBp;
                    (_o = this.genomeBrowser) === null || _o === void 0 ? void 0 : _o.set_stick(stick);
                    (_p = this.genomeBrowser) === null || _p === void 0 ? void 0 : _p.wait();
                    (_q = this.genomeBrowser) === null || _q === void 0 ? void 0 : _q.goto(startBp, endBp);
                    this.x = startBp;
                    this.bpPerScreen = endBp - startBp;
                }
                else if (action.type === OutgoingActionType.TURN_ON_TRACKS) {
                    for (_i = 0, _b = action.payload.track_ids; _i < _b.length; _i++) {
                        track_id = _b[_i];
                        (_r = this.genomeBrowser) === null || _r === void 0 ? void 0 : _r.set_switch(["track", track_id]);
                        (_s = this.genomeBrowser) === null || _s === void 0 ? void 0 : _s.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.TURN_OFF_TRACKS) {
                    for (_c = 0, _d = action.payload.track_ids; _c < _d.length; _c++) {
                        track_id = _d[_c];
                        (_t = this.genomeBrowser) === null || _t === void 0 ? void 0 : _t.clear_switch(["track", track_id]);
                        (_u = this.genomeBrowser) === null || _u === void 0 ? void 0 : _u.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.TURN_ON_LABELS) {
                    for (_e = 0, _f = action.payload.track_ids; _e < _f.length; _e++) {
                        track_id = _f[_e];
                        (_v = this.genomeBrowser) === null || _v === void 0 ? void 0 : _v.set_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.TURN_OFF_LABELS) {
                    for (_g = 0, _h = action.payload.track_ids; _g < _h.length; _g++) {
                        track_id = _h[_g];
                        (_w = this.genomeBrowser) === null || _w === void 0 ? void 0 : _w.clear_switch(["track", track_id, "label"]);
                    }
                }
                else if (action.type === OutgoingActionType.ZOOM_IN) {
                    this.bpPerScreen = this.bpPerScreen - 10000;
                    (_x = this.genomeBrowser) === null || _x === void 0 ? void 0 : _x.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === OutgoingActionType.ZOOM_OUT) {
                    this.bpPerScreen = this.bpPerScreen + 10000;
                    (_y = this.genomeBrowser) === null || _y === void 0 ? void 0 : _y.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === OutgoingActionType.MOVE_LEFT) {
                    this.x = this.x + 10000;
                    (_z = this.genomeBrowser) === null || _z === void 0 ? void 0 : _z.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === OutgoingActionType.MOVE_RIGHT) {
                    this.x = this.x - 10000;
                    (_0 = this.genomeBrowser) === null || _0 === void 0 ? void 0 : _0.goto(this.x, (this.x + this.bpPerScreen));
                }
                else if (action.type === OutgoingActionType.MOVE_UP) {
                    this.y = this.y + 10;
                    (_1 = this.genomeBrowser) === null || _1 === void 0 ? void 0 : _1.set_y(this.y);
                }
                else if (action.type === OutgoingActionType.MOVE_DOWN) {
                    this.y = this.y - 10;
                    (_2 = this.genomeBrowser) === null || _2 === void 0 ? void 0 : _2.set_y(this.y);
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
    EnsemblGenomeBrowser.prototype.init = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var _o, init, GenomeBrowser;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        if (!!this.inited) return [3, 3];
                        return [4, import('./peregrine_ensembl-cb578622.js')];
                    case 1:
                        _o = _p.sent(), init = _o["default"], GenomeBrowser = _o.GenomeBrowser;
                        return [4, init()];
                    case 2:
                        _p.sent();
                        this.genomeBrowser = new GenomeBrowser();
                        (_a = this.genomeBrowser) === null || _a === void 0 ? void 0 : _a.go({});
                        _p.label = 3;
                    case 3:
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
                        (_l = this.genomeBrowser) === null || _l === void 0 ? void 0 : _l.set_switch(["settings"]);
                        (_m = this.genomeBrowser) === null || _m === void 0 ? void 0 : _m.set_message_reporter(this.handleIncoming);
                        return [2];
                }
            });
        });
    };
    return EnsemblGenomeBrowser;
}());

export { EnsemblGenomeBrowser, IncomingActionType, Markup, OutgoingActionType };
