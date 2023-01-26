import type {
  ConfigData,
  GenomeBrowserType,
  IncomingActionType,
  OutgoingAction,
  Subscribe,
  SubscribeArgs
} from './types';
import initializeGenomeBrowser, { GenomeBrowser } from './peregrine/peregrine_ensembl';

import send from './methods/send';
import subscribe from './methods/subscribe';
import handleIncoming from './methods/handleIncoming';

const allSubscriptions = new Map<
  IncomingActionType,
  Set<(action: any) => void>
>();

class EnsemblGenomeBrowser {
  genomeBrowser: GenomeBrowserType | null = null;
  subscriptions = allSubscriptions;
  send: (action: OutgoingAction) => void = () => undefined;

  subscribe: Subscribe = () => {
    return { unsubscribe: () => undefined };
  };

  handleIncoming: (
    ...action: [type: IncomingActionType, payload: any]
  ) => void = () => undefined;

  formatIncoming: (actionType: IncomingActionType, payload: any) => any = () =>
    undefined;

  public async init(config: ConfigData = {}) {
    await initialiseWasm();

    this.genomeBrowser = new GenomeBrowser();
    this.genomeBrowser?.go(config);
    this.send = (action: OutgoingAction) =>
      send(this.genomeBrowser as GenomeBrowserType, action);
    this.handleIncoming = (
      ...action: [type: IncomingActionType, payload: any]
    ) => handleIncoming(this.subscriptions, ...action);
    this.subscribe = (...args: SubscribeArgs) =>
      subscribe(this.subscriptions, ...args);

    if (this.handleIncoming) {
      this.genomeBrowser?.set_message_reporter(this.handleIncoming);
    }
  }
}

let initializationPromise: Promise<unknown>;

const initialiseWasm = async () => {
  if (!initializationPromise) {
    initializationPromise = initializeGenomeBrowser();
  }

  await initializationPromise;
  initializationPromise = Promise.resolve(); // to free up possible memory
};

export default EnsemblGenomeBrowser;
