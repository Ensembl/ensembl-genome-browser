import { ConfigData, GenomeBrowserType, IncomingActionType, OutgoingAction, Subscribe } from './types';
declare class EnsemblGenomeBrowser {
    genomeBrowser: GenomeBrowserType | null;
    inited: boolean;
    subscriptions: Map<IncomingActionType, Set<(action: any) => void>>;
    send: (action: OutgoingAction) => Promise<void>;
    subscribe: Subscribe;
    handleIncoming: (...action: [type: IncomingActionType | "error", payload: any]) => void;
    formatIncoming: (actionType: IncomingActionType, payload: any) => any;
    init(config?: ConfigData): Promise<void>;
}
export * from './types';
export default EnsemblGenomeBrowser;
