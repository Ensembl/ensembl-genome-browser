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
  TURN_ON_SEVERAL_TRANSCRIPTS = 'turn_on_several_transcripts',
  TURN_OFF_SEVERAL_TRANSCRIPTS = 'turn_off_several_transcripts',
  SET_VISIBLE_TRANSCRIPTS = 'set_visible_transcripts',
  TURN_ON_TRANSCRIPT_LABELS = 'turn_on_transcript_labels',
  TURN_OFF_TRANSCRIPT_LABELS = 'turn_off_transcript_labels',
  TOGGLE_FOCUS_VARIANT_TRACK_SETTING = 'toggle_focus_variant_track_setting',
  ZMENU_ENTER = 'zmenu-enter',
  ZOOM_IN = 'zoom_in',
  ZOOM_OUT = 'zoom_out',
  MARK_TRACK_GROUP = 'mark_track_group'
}

export enum IncomingActionType {
  GENOME_BROWSER_READY = 'genome_browser_ready',
  CURRENT_POSITION = 'current_position',
  TARGET_POSITION = 'target_position',
  SCROLL_POSITION = 'scroll_position',
  TRACK_SUMMARY = 'track_summary',
  HOTSPOT = 'hotspot',
  VISIBLE_TRANSCRIPTS = 'visible_transcripts',
  ERROR = 'error',
  OUT_OF_DATE = 'out-of-date' // TODO: this is temporary; will need to fix this
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

export type HotspotPayload =
  | TranscriptsLozengePayload
  | ZmenuCreatePayload
  | TrackLegendHotspotPayload;

export type TranscriptsLozengePayload = AnchorCoordinates & {
  content: TranscriptsLozengeContent[];
  variety: TranscriptsLozengeVariety[];
};

export type TranscriptsLozengeContent = {
  currently_all: boolean;
  focus: boolean;
  id: string; // stable id of the gene
};

export type TranscriptsLozengeVariety = {
  type: string; // 'lozenge'
};

export type TrackLegendHotspotPayload = AnchorCoordinates & {
  variety: TrackLegendHotspotVariety[];
  content: TrackLegendHotspotContent[];
  start: boolean; // true on mouse in; false on mouse out
};

export type TrackLegendHotspotVariety = {
  type: string; // 'track-hover'
};

export type TrackLegendHotspotContent = {
  track: string; // track id
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
  versioned_id: string;
  unversioned_id: string;
  designation: string;
  strand: string;
  transcript_biotype: string;
  track: string;
  type: ZmenuFeatureType.TRANSCRIPT;
  gene_id: string; // refers to gene's versioned stabled id
};

export type ZmenuContentGeneMetadata = {
  symbol: string;
  name: string;
  unversioned_id: string;
  versioned_id: string;
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

export type ZmenuContent = ZmenuContentGene | ZmenuContentTranscript;

export enum ZmenuPayloadVarietyType {
  GENE_AND_ONE_TRANSCRIPT = "gene-and-one-transcript"
}

export type ZmenuPayloadVariety = {
  type: string; //'zmenu'
  'zmenu-type': ZmenuPayloadVarietyType
};

export type ZmenuCreatePayload = AnchorCoordinates & {
  content: ZmenuContent[];
  variety: ZmenuPayloadVariety[];
};

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

export type ReportVisibleTranscriptsAction = {
  type: IncomingActionType.VISIBLE_TRANSCRIPTS;
  payload: {
    track_id: string;
    transcript_ids: string[];
    gene_id: string;
  };
};

export type HotspotAction = {
  type: IncomingActionType.HOTSPOT;
  payload: HotspotPayload
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

export type TurnOnSeveralTranscriptsAction = {
  type: OutgoingActionType.TURN_ON_SEVERAL_TRANSCRIPTS;
  payload: {
    track_ids: string[];
  };
};

export type TurnOffSeveralTranscriptsAction = {
  type: OutgoingActionType.TURN_OFF_SEVERAL_TRANSCRIPTS;
  payload: {
    track_ids: string[];
  };
};

export type SetVisibleTranscripts = {
  type: OutgoingActionType.SET_VISIBLE_TRANSCRIPTS;
  payload: {
    track_id: string;
    transcript_ids: string[] | null;
  };
};


export type TurnOnTranscriptLabelsAction = {
  type: OutgoingActionType.TURN_ON_TRANSCRIPT_LABELS;
  payload: {
    track_ids: string[];
  }
};

export type TurnOffTranscriptLabelsAction = {
  type: OutgoingActionType.TURN_OFF_TRANSCRIPT_LABELS;
  payload: {
    track_ids: string[];
  };
};

export type ToggleFocusVariantTrackSettingAction = {
  type: OutgoingActionType.TOGGLE_FOCUS_VARIANT_TRACK_SETTING;
  payload: {
    setting_name: string;
    is_on: boolean;
  }
}

export type BrowserSetFocusAction = {
  type: OutgoingActionType.SET_FOCUS;
  payload: {
    focusId: string;
    focusType: string;
    genomeId: string;
    bringIntoView?: boolean;
  };
};

export type BrowserSetFocusLocationAction = {
  type: OutgoingActionType.SET_FOCUS_LOCATION;
  payload: {
    chromosome: string;
    endBp: number;
    startBp: number;
    genomeId: string;
    focus?: {
      id: string;
      type: string;
    } | null;
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

export type MarkTrackGroupAction = {
  type: OutgoingActionType.MARK_TRACK_GROUP,
  payload: { track_group: string }
};

export type OutgoingAction =
  | BrowserToggleTracksAction
  | TurnOnTracksAction
  | TurnOffTracksAction
  | TurnOnLabelsAction
  | TurnOffLabelsAction
  | TurnOnNamesAction
  | TurnOffNamesAction
  | TurnOnSeveralTranscriptsAction
  | TurnOffSeveralTranscriptsAction
  | SetVisibleTranscripts
  | TurnOnTranscriptLabelsAction
  | TurnOffTranscriptLabelsAction
  | ToggleFocusVariantTrackSettingAction
  | ZmenuEnterAction
  | BrowserSetFocusLocationAction
  | BrowserSetFocusAction
  | MoveUpAction
  | MoveDownAction
  | MoveLeftAction
  | MoveRightAction
  | ZoomInAction
  | ZoomOutAction
  | MarkTrackGroupAction;

export type IncomingAction =
  | BrowserCurrentLocationUpdateAction
  | BrowserTargetLocationUpdateAction
  | UpdateCogPositionAction
  | UpdateTrackSummaryAction
  | HotspotAction
  | ReportVisibleTranscriptsAction
  | GenomeBrowserErrorAction;

export type SubscribeArgs =
  | [BrowserCurrentLocationUpdateAction['type'], (action: BrowserCurrentLocationUpdateAction) => void]
  | [BrowserTargetLocationUpdateAction['type'], (action: BrowserTargetLocationUpdateAction) => void]
  | [UpdateCogPositionAction['type'], (action: UpdateCogPositionAction) => void]
  | [UpdateTrackSummaryAction['type'], (action: UpdateTrackSummaryAction) => void]
  | [HotspotAction['type'], (action: HotspotAction) => void]
  | [ReportVisibleTranscriptsAction['type'], (action: ReportVisibleTranscriptsAction) => void]
  | [GenomeBrowserErrorAction['type'], (action: GenomeBrowserErrorAction) => void];

export type Subscriptions = Map<IncomingActionType, Set<(action: any) => void>>;

export type Subscribe = (...args: SubscribeArgs) => {
  unsubscribe: () => void
};

export type PrimitiveValue = string | number | boolean | null;
export type ArrayValue = PrimitiveValue[] | JSONValue[];
export type PrimitiveOrArrayValue = PrimitiveValue | ArrayValue;

export type JSONValue = PrimitiveOrArrayValue | {
  [key: string]: PrimitiveOrArrayValue | JSONValue;
};

export type GenomeBrowserType = {
  go: (config_object: any) => void;
  set_stick: (stickId: string) => void;
  wait: () => void;
  goto: (left: number, right: number) => void;
  jump: (location: string) => void;
  set_y: (y: number) => void;
  switch: (path: string[], value: JSONValue) => void;
  set_message_reporter: (callback: (...action: [type: IncomingActionType, payload: any]) => void) => void;
};


export type ConfigData = {
  backend_url?: string;
  target_element_id?: string;
  "debug.show-incoming-messages"?: string;
};

export enum GenomeBrowserErrorType {
  BAD_VERSION = 'BadVersion' // genome browser client is out of date with the backend
}

export type VersionMismatchError = {
  type: GenomeBrowserErrorType.BAD_VERSION;
};

export type GenomeBrowserError =
  | VersionMismatchError;

export type GenomeBrowserErrorAction = {
  type: IncomingActionType.OUT_OF_DATE; // TODO: change this to IncomingActionType.ERROR when genome browser learns to send proper error messages
  payload: GenomeBrowserError;
};