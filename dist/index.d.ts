import { IncomingAction, IncomingActionType, OutgoingAction } from './types';
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
    set_message_reporter: (callback: (...action: [type: IncomingActionType, payload: any]) => void) => void;
};
declare type ConfigData = {
    backend_url?: string;
};
declare class EnsemblGenomeBrowser {
    genomeBrowser: GenomeBrowserType | null;
    bpPerScreen: number;
    x: number;
    y: number;
    inited: boolean;
    init(config?: ConfigData): Promise<void>;
    formatIncoming: (actionType: IncomingActionType, payload: any) => IncomingAction;
    handleIncoming: (type: IncomingActionType, payload: any) => void;
    send: (action: OutgoingAction) => Promise<void>;
    subscribe: (actionTypes: IncomingActionType[], callback: Callback) => {
        unsubscribe(): void;
    };
}
export * from './types';
export default EnsemblGenomeBrowser;
