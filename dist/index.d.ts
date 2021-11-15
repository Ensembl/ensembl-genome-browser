import { IncomingAction, IncomingActionType, OutgoingAction, Subscribe } from './types';
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
    target_element_id?: string;
};
declare class EnsemblGenomeBrowser {
    genomeBrowser: GenomeBrowserType | null;
    inited: boolean;
    init(config?: ConfigData): Promise<void>;
    formatIncoming: (actionType: IncomingActionType, payload: any) => IncomingAction;
    handleIncoming: (type: "error" | IncomingActionType, payload: any) => void;
    send: (action: OutgoingAction) => Promise<void>;
    subscribe: Subscribe;
}
export * from './types';
export default EnsemblGenomeBrowser;
