export type CogScrollPayload = {
  delta_y: number;
};

export type CogList = {
  [key: string]: number;
};

export type CogTrackScrollPayload = {
  track_y: CogList;
};

export type ChrLocation = [string, number, number];
// states are top, right, bottom, left (TRBL) and minus (zoom out) and plus (zoom in)
export type BrowserNavStates = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

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

export type ZmenuContentItem = {
  text: string;
  markup: Markup[];
};

export type ZmenuContentBlock = ZmenuContentItem[];

export type ZmenuContentLine = ZmenuContentBlock[];

export type ZmenuContentFeature = {
  id: string;
  track_id: string;
  lines: ZmenuContentLine[];
};
