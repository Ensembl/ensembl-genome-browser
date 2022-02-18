import { GenomeBrowserType } from '../types';
import { OutgoingAction } from '../types';
declare const send: (genomeBrowser: GenomeBrowserType, action: OutgoingAction) => Promise<void>;
export default send;
