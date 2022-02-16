import { 
  IncomingAction,
  IncomingActionType, 
  ZmenuCreateAction, 
  ZmenuContentTranscriptMetadata, 
  ZmenuFeatureType,
  UpdateTrackSummaryAction,
  ZmenuContentGene,
  ZmenuContentTranscript
} from '../types';

export type ZmenuContent = (ZmenuContentGene | ZmenuContentTranscript)[];

const formatIncoming = (actionType: IncomingActionType, payload: any) => {
    
  if (actionType === IncomingActionType.TRACK_SUMMARY) {

      return {
        type: actionType,
        payload: payload.summary
      } as UpdateTrackSummaryAction
  }

  return {
    type: actionType,
    payload
  } as IncomingAction

}

export default formatIncoming;