export declare enum OutgoingActionType {
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
    TURN_ON_NAMES = "turn_on_names",
    TURN_OFF_NAMES = "turn_off_names",
    ZMENU_ENTER = "zmenu-enter",
    ZOOM_IN = "zoom_in",
    ZOOM_OUT = "zoom_out"
}
export declare enum IncomingActionType {
    GENOME_BROWSER_READY = "genome_browser_ready",
    CURRENT_POSITION = "current_position",
    TARGET_POSITION = "target_position",
    SCROLL_POSITION = "scroll_position",
    TRACK_SUMMARY = "track_summary",
    ZMENU_CREATE = "zmenu",
    ZMENU_REPOSITION = "update_zmenu_position"
}
export declare type CogScrollPayload = {
    delta_y: number;
};
export declare type TrackSummary = {
    "switch-id": string;
    offset: string;
    height: string;
};
export declare type TrackSummaryList = TrackSummary[];
export declare type AnchorCoordinates = {
    x: number;
    y: number;
};
export declare enum Markup {
    STRONG = "strong",
    EMPHASIS = "emphasis",
    FOCUS = "focus",
    LIGHT = "light"
}
export declare enum ZmenuFeatureType {
    GENE = "gene",
    TRANSCRIPT = "transcript"
}
export declare type ZmenuContentItem = {
    text: string;
    markup: Markup[];
};
export declare type ZmenuContentBlock = {
    type: 'block';
    items: ZmenuContentItem[];
};
export declare type ZmenuContentLineBreak = {
    type: 'line-break';
};
export declare type ZmenuContentLine = ZmenuContentBlock[];
export declare type ZmenuContentTranscriptMetadata = {
    designation: string;
    strand: string;
    transcript_biotype: string;
    transcript_id: string;
    track: string;
    type: ZmenuFeatureType.TRANSCRIPT;
};
export declare type ZmenuContentGeneMetadata = {
    id: string;
    symbol: string;
    track: string;
    type: ZmenuFeatureType.GENE;
};
export declare type ZmenuContentMetadata = ZmenuContentTranscriptMetadata | ZmenuContentGeneMetadata;
export declare type ZmenuContentFeature = {
    data: ZmenuContentLine[];
    metadata: ZmenuContentMetadata;
};
export declare type ZmenuData = {
    id: string;
    unversioned_id: string;
    anchor_coordinates: AnchorCoordinates;
    content: ZmenuContentFeature[];
};
export declare type ZmenuCreatePayload = {
    action: IncomingActionType.ZMENU_CREATE;
    id: string;
    anchor_coordinates: AnchorCoordinates;
    content: ZmenuContentFeature[];
};
export declare type ZmenuPayload = {
    id: string;
    unversioned_id: string;
    anchor_coordinates: AnchorCoordinates;
    content: ZmenuContentFeature[];
};
export declare type PositionUpdatePayload = {
    stick: string;
    start: number;
    end: number;
};
export declare type GenomeBrowserReadyAction = {
    type: IncomingActionType.GENOME_BROWSER_READY;
    payload: never;
};
export declare type BrowserCurrentLocationUpdateAction = {
    type: IncomingActionType.CURRENT_POSITION;
    payload: PositionUpdatePayload;
};
export declare type BrowserTargetLocationUpdateAction = {
    type: IncomingActionType.TARGET_POSITION;
    payload: PositionUpdatePayload;
};
export declare type UpdateCogPositionAction = {
    type: IncomingActionType.SCROLL_POSITION;
    payload: CogScrollPayload;
};
export declare type UpdateCogTrackPositionAction = {
    type: IncomingActionType.TRACK_SUMMARY;
    payload: TrackSummaryList;
};
export declare type ZmenuAction = {
    type: IncomingActionType.ZMENU_CREATE;
    payload: ZmenuPayload;
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
export declare type TurnOnNamesAction = {
    type: OutgoingActionType.TURN_ON_NAMES;
    payload: {
        track_ids: string[];
    };
};
export declare type TurnOffNamesAction = {
    type: OutgoingActionType.TURN_OFF_NAMES;
    payload: {
        track_ids: string[];
    };
};
export declare type BrowserSetFocusAction = {
    type: OutgoingActionType.SET_FOCUS;
    payload: {
        focus: string;
        genomeId: string;
        stick: string;
    };
};
export declare type BrowserSetFocusLocationAction = {
    type: OutgoingActionType.SET_FOCUS_LOCATION;
    payload: {
        endBp: number;
        startBp: number;
        stick: string;
        focus: string | null;
        genomeId: string;
    };
};
export declare type ZmenuEnterAction = {
    type: OutgoingActionType.ZMENU_ENTER;
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
export declare type OutgoingAction = BrowserToggleTracksAction | TurnOnTracksAction | TurnOffTracksAction | TurnOnLabelsAction | TurnOffLabelsAction | TurnOnNamesAction | TurnOffNamesAction | ZmenuEnterAction | BrowserSetFocusLocationAction | BrowserSetFocusAction | MoveUpAction | MoveDownAction | MoveLeftAction | MoveRightAction | ZoomInAction | ZoomOutAction;
export declare type IncomingAction = BrowserCurrentLocationUpdateAction | BrowserTargetLocationUpdateAction | UpdateCogPositionAction | UpdateCogTrackPositionAction | ZmenuAction | ZmenuRepositionAction;
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
    type: OutgoingActionType.TURN_ON_NAMES;
    payload: {
        track_ids: string[];
    };
} | {
    type: OutgoingActionType.TURN_OFF_NAMES;
    payload: {
        track_ids: string[];
    };
} | {
    type: OutgoingActionType.SET_FOCUS;
    payload: {
        focus: string;
        genomeId: string;
        stick: string;
    };
} | {
    type: OutgoingActionType.SET_FOCUS_LOCATION;
    payload: {
        endBp: number;
        startBp: number;
        stick: string;
        focus: string | null;
        genomeId: string;
    };
} | {
    type: OutgoingActionType.ZMENU_ENTER;
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
};
