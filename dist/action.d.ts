import { CogScrollPayload, CogTrackScrollPayload, ChrLocation, BrowserNavStates, AnchorCoordinates, ZmenuContentFeature } from "./types";
export declare enum OutgoingActionType {
    PING = "ping",
    ACTIVATE_BROWSER = "activate_browser",
    MOVE_DOWN = "move_down",
    MOVE_LEFT = "move_left",
    MOVE_RIGHT = "move_right",
    MOVE_UP = "move_up",
    SET_FOCUS = "set_focus",
    SET_FOCUS_LOCATION = "set_focus_location",
    TOGGLE_TRACKS = "toggle_tracks",
    TURN_ON_TRACKS = "turn_on_tracks",
    TURN_OFF_TRACKS = "turn_off_tracks",
    TURN_ON_LABELS = "turn_on_labels",
    TURN_OFF_LABELS = "turn_off_labels",
    ZMENU_ACTIVITY_OUTSIDE = "zmenu-activity-outside",
    ZMENU_ENTER = "zmenu-enter",
    ZMENU_LEAVE = "zmenu-leave",
    ZOOM_IN = "zoom_in",
    ZOOM_OUT = "zoom_out"
}
export declare enum IncomingActionType {
    GENOME_BROWSER_READY = "genome_browser_ready",
    UPDATE_LOCATION = "update_location",
    UPDATE_SCROLL_POSITION = "update_scroll_position",
    UPDATE_TRACK_POSITION = "upadte_track_position",
    ZMENU_CREATE = "create_zmenu",
    ZMENU_DESTROY = "destroy_zmenu",
    ZMENU_REPOSITION = "update_zmenu_position"
}
export declare type GenomeBrowserReadyAction = {
    type: IncomingActionType.GENOME_BROWSER_READY;
    payload: never;
};
export declare type BrowserLocationUpdateAction = {
    type: IncomingActionType.UPDATE_LOCATION;
    payload: {
        bumper?: BrowserNavStates;
        "intended-location"?: ChrLocation;
        "actual-location"?: ChrLocation;
        "is-focus-position"?: boolean;
    };
};
export declare type UpdateCogPositionAction = {
    type: IncomingActionType.UPDATE_SCROLL_POSITION;
    payload: CogScrollPayload;
};
export declare type UpdateCogTrackPositionAction = {
    type: IncomingActionType.UPDATE_TRACK_POSITION;
    payload: CogTrackScrollPayload;
};
export declare type ZmenuCreateAction = {
    type: IncomingActionType.ZMENU_CREATE;
    payload: {
        id: string;
        anchor_coordinates: AnchorCoordinates;
        content: ZmenuContentFeature[];
    };
};
export declare type ZmenuDestroyAction = {
    type: IncomingActionType.ZMENU_DESTROY;
    payload: {
        id: string;
    };
};
export declare type ZmenuRepositionAction = {
    type: IncomingActionType.ZMENU_REPOSITION;
    payload: {
        id: string;
        anchor_coordinates: {
            x: number;
            y: number;
        };
    };
};
export declare type BrowserToggleTracksAction = {
    type: OutgoingActionType.TOGGLE_TRACKS;
    payload: {
        on?: string | string[];
        off?: string | string[];
    };
};
export declare type TurnOnTracksAction = {
    type: OutgoingActionType.TURN_ON_TRACKS;
    payload: {
        track_ids: string[];
    };
};
export declare type TurnOffTracksAction = {
    type: OutgoingActionType.TURN_OFF_TRACKS;
    payload: {
        track_ids: string[];
    };
};
export declare type TurnOnLabelsAction = {
    type: OutgoingActionType.TURN_ON_LABELS;
    payload: {
        track_ids: string[];
    };
};
export declare type TurnOffLabelsAction = {
    type: OutgoingActionType.TURN_OFF_LABELS;
    payload: {
        track_ids: string[];
    };
};
export declare type BrowserSetFocusAction = {
    type: OutgoingActionType.SET_FOCUS;
    payload: {
        focus?: string | undefined;
    };
};
export declare type BrowserSetFocusLocationAction = {
    type: OutgoingActionType.SET_FOCUS_LOCATION;
    payload: {
        endBp: number;
        startBp: number;
    };
};
export declare type ActivateBrowserAction = {
    type: OutgoingActionType.ACTIVATE_BROWSER;
};
export declare type ZmenuEnterAction = {
    type: OutgoingActionType.ZMENU_ENTER;
    payload: {
        id: string;
    };
};
export declare type ZmenuOutsideActivityAction = {
    type: OutgoingActionType.ZMENU_ACTIVITY_OUTSIDE;
    payload: {
        id: string;
    };
};
export declare type ZmenuLeaveAction = {
    type: OutgoingActionType.ZMENU_LEAVE;
    payload: {
        id: string;
    };
};
export declare type MoveUpAction = {
    type: OutgoingActionType.MOVE_UP;
    payload: {
        move_up_px: number;
    };
};
export declare type MoveDownAction = {
    type: OutgoingActionType.MOVE_DOWN;
    payload: {
        move_down_px: number;
    };
};
export declare type MoveLeftAction = {
    type: OutgoingActionType.MOVE_LEFT;
    payload: {
        move_left_px: number;
    };
};
export declare type MoveRightAction = {
    type: OutgoingActionType.MOVE_RIGHT;
    payload: {
        move_right_px: number;
    };
};
export declare type ZoomInAction = {
    type: OutgoingActionType.ZOOM_IN;
    payload: {
        zoom_by: number;
    };
};
export declare type ZoomOutAction = {
    type: OutgoingActionType.ZOOM_OUT;
    payload: {
        zoom_by: number;
    };
};
export declare type PingAction = {
    type: OutgoingActionType.PING;
};
export declare type OutgoingAction = PingAction | ActivateBrowserAction | BrowserToggleTracksAction | TurnOnTracksAction | TurnOffTracksAction | TurnOnLabelsAction | TurnOffLabelsAction | ZmenuEnterAction | ZmenuLeaveAction | ZmenuOutsideActivityAction | BrowserSetFocusLocationAction | BrowserSetFocusAction | MoveUpAction | MoveDownAction | MoveLeftAction | MoveRightAction | ZoomInAction | ZoomOutAction;
export declare type IncomingAction = GenomeBrowserReadyAction | BrowserLocationUpdateAction | UpdateCogPositionAction | UpdateCogTrackPositionAction | ZmenuCreateAction | ZmenuDestroyAction | ZmenuRepositionAction;
export declare const createOutgoingAction: (action: OutgoingAction) => {
    type: OutgoingActionType.TOGGLE_TRACKS;
    payload: {
        on?: string | string[];
        off?: string | string[];
    };
} | {
    type: OutgoingActionType.TURN_ON_TRACKS;
    payload: {
        track_ids: string[];
    };
} | {
    type: OutgoingActionType.TURN_OFF_TRACKS;
    payload: {
        track_ids: string[];
    };
} | {
    type: OutgoingActionType.TURN_ON_LABELS;
    payload: {
        track_ids: string[];
    };
} | {
    type: OutgoingActionType.TURN_OFF_LABELS;
    payload: {
        track_ids: string[];
    };
} | {
    type: OutgoingActionType.SET_FOCUS;
    payload: {
        focus?: string | undefined;
    };
} | {
    type: OutgoingActionType.SET_FOCUS_LOCATION;
    payload: {
        endBp: number;
        startBp: number;
    };
} | {
    type: OutgoingActionType.ACTIVATE_BROWSER;
} | {
    type: OutgoingActionType.ZMENU_ENTER;
    payload: {
        id: string;
    };
} | {
    type: OutgoingActionType.ZMENU_ACTIVITY_OUTSIDE;
    payload: {
        id: string;
    };
} | {
    type: OutgoingActionType.ZMENU_LEAVE;
    payload: {
        id: string;
    };
} | {
    type: OutgoingActionType.MOVE_UP;
    payload: {
        move_up_px: number;
    };
} | {
    type: OutgoingActionType.MOVE_DOWN;
    payload: {
        move_down_px: number;
    };
} | {
    type: OutgoingActionType.MOVE_LEFT;
    payload: {
        move_left_px: number;
    };
} | {
    type: OutgoingActionType.MOVE_RIGHT;
    payload: {
        move_right_px: number;
    };
} | {
    type: OutgoingActionType.ZOOM_IN;
    payload: {
        zoom_by: number;
    };
} | {
    type: OutgoingActionType.ZOOM_OUT;
    payload: {
        zoom_by: number;
    };
} | {
    type: OutgoingActionType.PING;
};
