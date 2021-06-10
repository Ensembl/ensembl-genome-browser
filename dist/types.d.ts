export declare type CogScrollPayload = {
    delta_y: number;
};
export declare type CogList = {
    [key: string]: number;
};
export declare type CogTrackScrollPayload = {
    track_y: CogList;
};
export declare type ChrLocation = [string, number, number];
export declare type BrowserNavStates = [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean
];
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
export declare type ZmenuContentItem = {
    text: string;
    markup: Markup[];
};
export declare type ZmenuContentBlock = ZmenuContentItem[];
export declare type ZmenuContentLine = ZmenuContentBlock[];
export declare type ZmenuContentFeature = {
    id: string;
    track_id: string;
    lines: ZmenuContentLine[];
};
