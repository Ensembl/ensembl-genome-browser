import { IncomingAction, IncomingActionType, OutgoingAction } from './action';
declare type GenomeBrowserType = {
    go: () => void;
    set_stick: (stickId: string) => void;
    set_bp_per_screen: (bpPerScreen: number) => void;
    set_x: (x: number) => void;
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
    handleIncoming: (message: unknown) => void;
    send: (action: OutgoingAction) => Promise<void>;
    subscribe: (action: IncomingActionType[], callback: (action: IncomingAction) => void) => {
        unsubscribe(): void;
    };
}
export default EnsemblGenomeBrowser;
