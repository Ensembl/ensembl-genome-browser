import { IncomingAction, IncomingActionType, ZmenuContentGene, ZmenuContentTranscript } from '../types';
export declare type ZmenuContent = (ZmenuContentGene | ZmenuContentTranscript)[];
declare const formatIncoming: (actionType: IncomingActionType, payload: any) => IncomingAction;
export default formatIncoming;
