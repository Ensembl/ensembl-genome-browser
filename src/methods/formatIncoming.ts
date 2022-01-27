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
  } else if (actionType === IncomingActionType.ZMENU_CREATE) {

    const genes = (payload.content as ZmenuContent).filter( feature => feature.metadata.type === ZmenuFeatureType.GENE );
    const transcripts = (payload.content as ZmenuContent).filter( feature => feature.metadata.type === ZmenuFeatureType.TRANSCRIPT );

    const firstTranscriptMetadata = transcripts[0].metadata as ZmenuContentTranscriptMetadata;

    const id = firstTranscriptMetadata.transcript_id;
    const unversioned_id = id.split('.')[0];

    return {
      type: actionType,
      payload: {
        id,
        unversioned_id,
        anchor_coordinates: {x: payload.x, y : payload.y},
        genes,
        transcripts
      }
    } as ZmenuCreateAction

  }

  return {
    type: actionType,
    payload
  } as IncomingAction

}

export default formatIncoming;