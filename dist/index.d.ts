import { IncomingAction, IncomingActionType, OutgoingAction, OutgoingActionType, TrackSummaryList, TrackSummary } from './types';
declare type Callback = (action: IncomingAction) => void;
declare type GenomeBrowserType = {
    go: (config_object: any) => void;
    set_stick: (stickId: string) => void;
    wait: () => void;
    goto: (left: number, right: number) => void;
    jump: (location: string) => void;
    set_y: (y: number) => void;
    set_switch: (path: string[]) => void;
    clear_switch: (path: string[]) => void;
    set_message_reporter: (callback: (x: any) => void) => void;
};
declare class EnsemblGenomeBrowser {
    genomeBrowser: GenomeBrowserType | null;
    bpPerScreen: number;
    x: number;
    y: number;
    inited: boolean;
    init(): Promise<void>;
    formatIncoming: (actionType: IncomingActionType, payload: any) => IncomingAction;
    handleIncoming: (actionType: IncomingActionType, ...more: any) => void;
    send: (action: OutgoingAction) => Promise<void>;
    subscribe: (actionTypes: IncomingActionType[], callback: Callback) => {
        unsubscribe(): void;
    };
}
export { IncomingAction, IncomingActionType, OutgoingAction, OutgoingActionType, TrackSummaryList, TrackSummary, EnsemblGenomeBrowser };
