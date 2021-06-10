"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOutgoingAction = exports.IncomingActionType = exports.OutgoingActionType = void 0;
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
})(OutgoingActionType = exports.OutgoingActionType || (exports.OutgoingActionType = {}));
var IncomingActionType;
(function (IncomingActionType) {
    IncomingActionType["GENOME_BROWSER_READY"] = "genome_browser_ready";
    IncomingActionType["UPDATE_LOCATION"] = "update_location";
    IncomingActionType["UPDATE_SCROLL_POSITION"] = "update_scroll_position";
    IncomingActionType["UPDATE_TRACK_POSITION"] = "upadte_track_position";
    IncomingActionType["ZMENU_CREATE"] = "create_zmenu";
    IncomingActionType["ZMENU_DESTROY"] = "destroy_zmenu";
    IncomingActionType["ZMENU_REPOSITION"] = "update_zmenu_position";
})(IncomingActionType = exports.IncomingActionType || (exports.IncomingActionType = {}));
var createOutgoingAction = function (action) {
    return __assign({}, action);
};
exports.createOutgoingAction = createOutgoingAction;
