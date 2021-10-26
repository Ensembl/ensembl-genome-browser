
export enum OutgoingActionType {
  MOVE_DOWN = 'move_down',
  MOVE_LEFT = 'move_left',
  MOVE_RIGHT = 'move_right',
  MOVE_UP = 'move_up',
  SET_FOCUS = 'set_focus',
  SET_FOCUS_LOCATION = 'set_focus_location',
  TOGGLE_TRACKS = 'toggle_tracks',
  TURN_ON_TRACKS = 'turn_on_tracks',
  TURN_OFF_TRACKS = 'turn_off_tracks',
  TURN_ON_LABELS = 'turn_on_labels',
  TURN_OFF_LABELS = 'turn_off_labels',
  TURN_ON_NAMES = 'turn_on_names',
  TURN_OFF_NAMES = 'turn_off_names',
  ZMENU_ENTER = 'zmenu-enter',
  ZOOM_IN = 'zoom_in',
  ZOOM_OUT = 'zoom_out'
}

export enum IncomingActionType {
  GENOME_BROWSER_READY = 'genome_browser_ready',
  CURRENT_POSITION = 'current_position',
  TARGET_POSITION = 'target_position',
  SCROLL_POSITION = 'scroll_position',
  TRACK_SUMMARY = 'track_summary',
  ZMENU_CREATE = 'zmenu',
  ZMENU_REPOSITION = 'update_zmenu_position'
}


export type CogScrollPayload = {
  delta_y: number;
};

export type TrackSummary = {
  "switch-id": string, 
  offset: string,
  height: string
}

export type TrackSummaryList = TrackSummary[];

export type AnchorCoordinates = {
  x: number;
  y: number;
};

export enum Markup {
  STRONG = "strong",
  EMPHASIS = "emphasis",
  FOCUS = "focus",
  LIGHT = "light",
}

export enum ZmenuFeatureType {
  GENE = 'gene',
  TRANSCRIPT = 'transcript'
}

export type ZmenuContentItem = {
  text: string;
  markup: Markup[];
};

export type ZmenuContentBlock = {
  type: 'block';
  items: ZmenuContentItem[];
};

export type ZmenuContentLineBreak = {
  type: 'line-break';
};

export type ZmenuContentLine = ZmenuContentBlock[] | ZmenuContentLineBreak;

export type ZmenuContentTranscriptMetadata = {
  designation: string;
  strand: string;
  transcript_biotype: string;
  transcript_id: string;
  track: string;
  type: ZmenuFeatureType.TRANSCRIPT;
};

export type ZmenuContentGeneMetadata = {
  id: string;
  symbol: string;
  track: string;
  type: ZmenuFeatureType.GENE;
};

export type ZmenuContentMetadata =
  | ZmenuContentTranscriptMetadata
  | ZmenuContentGeneMetadata;

export type ZmenuContentFeature = {
  data: ZmenuContentLine[];
  metadata: ZmenuContentMetadata;
};

// data that is sufficient to describe an instance of Zmenu
export type ZmenuData = {
  id: string;
  unversioned_id: string;
  anchor_coordinates: AnchorCoordinates;
  content: ZmenuContentFeature[];
};

// Sent from Genome browser to React
export type ZmenuCreatePayload = {
  action: IncomingActionType.ZMENU_CREATE;
  id: string;
  anchor_coordinates: AnchorCoordinates;
  content: ZmenuContentFeature[];
};

export type ZmenuPayload = {
  id: string,
  unversioned_id: string,
  anchor_coordinates: AnchorCoordinates,
  content: ZmenuContentFeature[]
}

export type PositionUpdatePayload = {
  stick: string
  start: number
  end: number
}

export type GenomeBrowserReadyAction = {
  type: IncomingActionType.GENOME_BROWSER_READY;
  payload: never;
};

export type BrowserCurrentLocationUpdateAction = {
  type: IncomingActionType.CURRENT_POSITION;
  payload: PositionUpdatePayload
};

export type BrowserTargetLocationUpdateAction = {
  type: IncomingActionType.TARGET_POSITION;
  payload: PositionUpdatePayload
};

export type UpdateCogPositionAction = {
  type: IncomingActionType.SCROLL_POSITION;
  payload: CogScrollPayload;
};

export type UpdateCogTrackPositionAction = {
  type: IncomingActionType.TRACK_SUMMARY;
  payload: TrackSummaryList;
};


export type ZmenuAction = {
  type: IncomingActionType.ZMENU_CREATE;
  payload: ZmenuPayload
};

export type ZmenuRepositionAction = {
  type: IncomingActionType.ZMENU_REPOSITION;
  payload: {
    id: string;
    anchor_coordinates: {
      x: number;
      y: number;
    };
  };
};

export type BrowserToggleTracksAction = {
  type: OutgoingActionType.TOGGLE_TRACKS;
  payload: {
    on?: string | string[];
    off?: string | string[];
  };
};

export type TurnOnTracksAction = {
  type: OutgoingActionType.TURN_ON_TRACKS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOffTracksAction = {
  type: OutgoingActionType.TURN_OFF_TRACKS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOnLabelsAction = {
  type: OutgoingActionType.TURN_ON_LABELS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOffLabelsAction = {
  type: OutgoingActionType.TURN_OFF_LABELS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOnNamesAction = {
  type: OutgoingActionType.TURN_ON_NAMES;
  payload: {
    track_ids: string[];
  };
};

export type TurnOffNamesAction = {
  type: OutgoingActionType.TURN_OFF_NAMES;
  payload: {
    track_ids: string[];
  };
};

export type BrowserSetFocusAction = {
  type: OutgoingActionType.SET_FOCUS;
  payload: {
    focus: string;
    genomeId: string;
    stick: string;
  };
};

export type BrowserSetFocusLocationAction = {
  type: OutgoingActionType.SET_FOCUS_LOCATION;
  payload: {
    endBp: number;
    startBp: number;
    stick: string;
    focus: string | null;
    genomeId: string;

  };
};

export type ZmenuEnterAction = {
  type: OutgoingActionType.ZMENU_ENTER;
  payload: {
    id: string;
  };
};

export type MoveUpAction = {
  type: OutgoingActionType.MOVE_UP;
  payload: { move_up_px: number };
};

export type MoveDownAction = {
  type: OutgoingActionType.MOVE_DOWN;
  payload: { move_down_px: number };
};

export type MoveLeftAction = {
  type: OutgoingActionType.MOVE_LEFT;
  payload: { move_left_px: number };
};

export type MoveRightAction = {
  type: OutgoingActionType.MOVE_RIGHT;
  payload: { move_right_px: number };
};

export type ZoomInAction = {
  type: OutgoingActionType.ZOOM_IN;
  payload: { zoom_by: number };
};

export type ZoomOutAction = {
  type: OutgoingActionType.ZOOM_OUT;
  payload: { zoom_by: number };
};

export type OutgoingAction =
  | BrowserToggleTracksAction
  | TurnOnTracksAction
  | TurnOffTracksAction
  | TurnOnLabelsAction
  | TurnOffLabelsAction
  | TurnOnNamesAction
  | TurnOffNamesAction
  | ZmenuEnterAction
  | BrowserSetFocusLocationAction
  | BrowserSetFocusAction
  | MoveUpAction
  | MoveDownAction
  | MoveLeftAction
  | MoveRightAction
  | ZoomInAction
  | ZoomOutAction;

export type IncomingAction =
  | BrowserCurrentLocationUpdateAction
  | BrowserTargetLocationUpdateAction
  | UpdateCogPositionAction
  | UpdateCogTrackPositionAction
  | ZmenuAction
  | ZmenuRepositionAction;

export const createOutgoingAction = (action: OutgoingAction) => {
  return { ...action };
};
