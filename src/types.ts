
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

export type ZmenuContentLine = ZmenuContentBlock[]

export type ZmenuContentTranscriptMetadata = {
  designation: string;
  strand: string;
  transcript_biotype: string;
  transcript_id: string;
  track: string;
  type: ZmenuFeatureType.TRANSCRIPT;
  gene_id: string;
};

export type ZmenuContentGeneMetadata = {
  id: string;
  symbol: string;
  track: string;
  type: ZmenuFeatureType.GENE;
};

export type ZmenuContentGene = {
  data: ZmenuContentLine[];
  metadata: ZmenuContentGeneMetadata;
};

export type ZmenuContentTranscript = {
  data: ZmenuContentLine[];
  metadata: ZmenuContentTranscriptMetadata;
};

export type ZmenuCreatePayload = {
  id: string,
  unversioned_id: string,
  anchor_coordinates: AnchorCoordinates,
  genes: ZmenuContentGene[],
  transcripts: ZmenuContentTranscript[]
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

export type UpdateTrackSummaryAction = {
  type: IncomingActionType.TRACK_SUMMARY;
  payload: TrackSummaryList;
};


export type ZmenuCreateAction = {
  type: IncomingActionType.ZMENU_CREATE;
  payload: ZmenuCreatePayload
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
  };
};

export type BrowserSetFocusLocationAction = {
  type: OutgoingActionType.SET_FOCUS_LOCATION;
  payload: {
    chromosome: string;
    endBp: number;
    startBp: number;
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
  | UpdateTrackSummaryAction
  | ZmenuCreateAction
  | ZmenuRepositionAction;

export type SubscribeArgs = 
  | [BrowserCurrentLocationUpdateAction['type'], (action: BrowserCurrentLocationUpdateAction) => void]
  | [BrowserTargetLocationUpdateAction['type'], (action: BrowserTargetLocationUpdateAction) => void]
  | [UpdateCogPositionAction['type'], (action: UpdateCogPositionAction) => void]
  | [UpdateTrackSummaryAction['type'], (action: UpdateTrackSummaryAction) => void]
  | [ZmenuCreateAction['type'], (action: ZmenuCreateAction) => void]
  | [ZmenuRepositionAction['type'], (action: ZmenuRepositionAction) => void];

export type Subscriptions = Map<IncomingActionType, Set<(action: any) => void>>;

export type Subscribe = (...args: SubscribeArgs) => {
  unsubscribe: () => void
};

export type GenomeBrowserType = {
  go: (config_object: any) => void;
  set_stick: (stickId: string) => void;
  wait: () => void;
  goto: (left: number, right: number) => void;
  jump: (location: string) => void;
  set_y: (y: number) => void;
  set_switch: (path: string[]) => void;
  clear_switch: (path: string[]) => void;
  set_message_reporter: (callback: (...action: [type: IncomingActionType, payload: any]) => void) => void;
};


export  type ConfigData = {
  backend_url?: string;
  target_element_id?: string;
  "debug.show-incoming-messages"?: string;
}