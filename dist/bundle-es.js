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

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
    OutgoingActionType["TURN_ON_NAMES"] = "turn_on_names";
    OutgoingActionType["TURN_OFF_NAMES"] = "turn_off_names";
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

var send = function (genomeBrowser, action) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, genomeId, focus_1, _b, chromosome, startBp, endBp, genomeId, focus_2, _c, _d, track_id, _e, _f, track_id, _g, _h, track_id, _j, _k, track_id, _l, _m, track_id, _o, _p, track_id;
    var e_1, _q, e_2, _r, e_3, _s, e_4, _t, e_5, _u, e_6, _v;
    return __generator(this, function (_w) {
        if (action.type === OutgoingActionType.SET_FOCUS) {
            _a = action.payload, genomeId = _a.genomeId, focus_1 = _a.focus;
            if (!action.payload.focus) {
                return [2];
            }
            genomeBrowser.jump("focus:" + genomeId + ":" + focus_1);
            genomeBrowser.wait();
            genomeBrowser.set_switch(["track"]);
            genomeBrowser.set_switch(["track", "focus"]);
            genomeBrowser.set_switch(["track", "focus", "label"]);
            genomeBrowser.set_switch(["focus", "gene"]);
            genomeBrowser.set_switch(["focus", "gene", focus_1]);
        }
        if (action.type === OutgoingActionType.SET_FOCUS_LOCATION) {
            _b = action.payload, chromosome = _b.chromosome, startBp = _b.startBp, endBp = _b.endBp, genomeId = _b.genomeId, focus_2 = _b.focus;
            genomeBrowser.set_stick(genomeId + ":" + chromosome);
            genomeBrowser.wait();
            if (focus_2) {
                genomeBrowser.set_switch(["track"]);
                genomeBrowser.set_switch(["track", "focus"]);
                genomeBrowser.set_switch(["focus", "gene"]);
                genomeBrowser.set_switch(["focus", "gene", focus_2]);
            }
            genomeBrowser.goto(startBp, endBp);
        }
        else if (action.type === OutgoingActionType.TURN_ON_TRACKS) {
            try {
                for (_c = __values(action.payload.track_ids), _d = _c.next(); !_d.done; _d = _c.next()) {
                    track_id = _d.value;
                    genomeBrowser.set_switch(["track", track_id]);
                    genomeBrowser.set_switch(["track", track_id, "label"]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_q = _c["return"])) _q.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (action.type === OutgoingActionType.TURN_OFF_TRACKS) {
            try {
                for (_e = __values(action.payload.track_ids), _f = _e.next(); !_f.done; _f = _e.next()) {
                    track_id = _f.value;
                    genomeBrowser.clear_switch(["track", track_id]);
                    genomeBrowser.clear_switch(["track", track_id, "label"]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_r = _e["return"])) _r.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else if (action.type === OutgoingActionType.TURN_ON_LABELS) {
            try {
                for (_g = __values(action.payload.track_ids), _h = _g.next(); !_h.done; _h = _g.next()) {
                    track_id = _h.value;
                    genomeBrowser.set_switch(["track", track_id, "label"]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_s = _g["return"])) _s.call(_g);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else if (action.type === OutgoingActionType.TURN_OFF_LABELS) {
            try {
                for (_j = __values(action.payload.track_ids), _k = _j.next(); !_k.done; _k = _j.next()) {
                    track_id = _k.value;
                    genomeBrowser.clear_switch(["track", track_id, "label"]);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_t = _j["return"])) _t.call(_j);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else if (action.type === OutgoingActionType.TURN_ON_NAMES) {
            try {
                for (_l = __values(action.payload.track_ids), _m = _l.next(); !_m.done; _m = _l.next()) {
                    track_id = _m.value;
                    genomeBrowser.set_switch(["track", track_id, "name"]);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_u = _l["return"])) _u.call(_l);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (action.type === OutgoingActionType.TURN_OFF_NAMES) {
            try {
                for (_o = __values(action.payload.track_ids), _p = _o.next(); !_p.done; _p = _o.next()) {
                    track_id = _p.value;
                    genomeBrowser.clear_switch(["track", track_id, "name"]);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_p && !_p.done && (_v = _o["return"])) _v.call(_o);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        return [2];
    });
}); };

var subscribe = function (subscriptions, args) {
    var _a = __read(args, 2), actionType = _a[0], subscriber = _a[1];
    var subscriptionsToAction = subscriptions.get(actionType);
    if (subscriptionsToAction) {
        subscriptionsToAction.add(subscriber);
    }
    else {
        subscriptions.set(actionType, new Set([subscriber]));
    }
    var unsubscribe = function () {
        var _a;
        (_a = subscriptions.get(actionType)) === null || _a === void 0 ? void 0 : _a["delete"](subscriber);
    };
    return {
        unsubscribe: unsubscribe
    };
};

var formatIncoming = function (actionType, payload) {
    if (actionType === IncomingActionType.TRACK_SUMMARY) {
        return {
            type: actionType,
            payload: payload.summary
        };
    }
    else if (actionType === IncomingActionType.ZMENU_CREATE) {
        var genes = payload.content.filter(function (feature) { return feature.metadata.type === ZmenuFeatureType.GENE; });
        var transcripts = payload.content.filter(function (feature) { return feature.metadata.type === ZmenuFeatureType.TRANSCRIPT; });
        var firstTranscriptMetadata = transcripts[0].metadata;
        var id = firstTranscriptMetadata.transcript_id;
        var unversioned_id = id.split('.')[0];
        return {
            type: actionType,
            payload: {
                id: id,
                unversioned_id: unversioned_id,
                anchor_coordinates: { x: payload.x, y: payload.y },
                genes: genes,
                transcripts: transcripts
            }
        };
    }
    return {
        type: actionType,
        payload: payload
    };
};

var handleIncoming = function (subscriptions, action) {
    var _a = __read(action, 2), type = _a[0], payload = _a[1];
    if (type === "error") {
        console.error(payload);
        return;
    }
    var subscriptionsToAction = subscriptions.get(type);
    if (subscriptionsToAction) {
        __spreadArray([], __read(subscriptionsToAction.values())).forEach(function (subscription) {
            var formattedIncoming = formatIncoming(type, payload);
            if (!formattedIncoming) {
                console.error(payload);
                return;
            }
            subscription(formattedIncoming);
        });
    }
};

var allSubscriptions = new Map();
var EnsemblGenomeBrowser = (function () {
    function EnsemblGenomeBrowser() {
        var _this = this;
        this.genomeBrowser = null;
        this.inited = false;
        this.subscriptions = allSubscriptions;
        this.send = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2, undefined];
        }); }); };
        this.subscribe = function () {
            return { unsubscribe: function () { return undefined; } };
        };
        this.handleIncoming = function () { return undefined; };
        this.formatIncoming = function () { return undefined; };
    }
    EnsemblGenomeBrowser.prototype.init = function (config) {
        var _a;
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _b, init, GenomeBrowser;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.inited) return [3, 3];
                        return [4, import('./peregrine_ensembl-6cf582b5.js')];
                    case 1:
                        _b = _c.sent(), init = _b["default"], GenomeBrowser = _b.GenomeBrowser;
                        return [4, init()];
                    case 2:
                        _c.sent();
                        this.genomeBrowser = new GenomeBrowser();
                        this.genomeBrowser.go(config);
                        this.send = function (action) { return send(_this.genomeBrowser, action); };
                        this.handleIncoming = function (action) { return handleIncoming(_this.subscriptions, action); };
                        this.subscribe = function (args) { return subscribe(_this.subscriptions, args); };
                        _c.label = 3;
                    case 3:
                        this.inited = true;
                        if (this.handleIncoming) {
                            (_a = this.genomeBrowser) === null || _a === void 0 ? void 0 : _a.set_message_reporter(this.handleIncoming);
                        }
                        return [2];
                }
            });
        });
    };
    return EnsemblGenomeBrowser;
}());

export default EnsemblGenomeBrowser;
export { IncomingActionType, Markup, OutgoingActionType, ZmenuFeatureType };
