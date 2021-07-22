import { IncomingAction, IncomingActionType, OutgoingAction } from './action';
import { GenomeBrowser } from './peregrine/peregrine_generic.js';
declare type Callback = (action: IncomingAction) => void;
declare class EnsemblGenomeBrowser {
    genomeBrowser: GenomeBrowser | null;
    bpPerScreen: number;
    x: number;
    y: number;
    inited: boolean;
    init(): Promise<void>;
    handleIncoming: (actionType: IncomingActionType, ...more: any) => void;
    send: (action: OutgoingAction) => Promise<void>;
    subscribe: (actionTypes: IncomingActionType[], callback: Callback) => {
        unsubscribe(): void;
    };
}
export default EnsemblGenomeBrowser;
