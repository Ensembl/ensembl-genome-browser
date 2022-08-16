import {
  IncomingAction,
  IncomingActionType,
  UpdateTrackSummaryAction,
  ReportVisibleTranscriptsAction,
  ZmenuContentGene,
  ZmenuContentTranscript
} from '../types';

export type ZmenuContent = (ZmenuContentGene | ZmenuContentTranscript)[];

const formatIncoming = (actionType: IncomingActionType, payload: any) => {
  if (actionType === IncomingActionType.TRACK_SUMMARY) {
    return {
      type: actionType,
      payload: payload.summary
    } as UpdateTrackSummaryAction;
  }

  if (actionType === IncomingActionType.VISIBLE_TRANSCRIPTS) {
    const focusTrackSummary = payload.summary.find(
      (track: any) => track['switch-id'] === 'focus'
    );
    const transcript_ids = focusTrackSummary['transcripts-shown'];
    const gene_id = focusTrackSummary.id;

    return {
      type: actionType,
      payload: {
        track_id: 'focus',
        transcript_ids,
        gene_id
      }
    } as ReportVisibleTranscriptsAction;
  }

  return {
    type: actionType,
    payload
  } as IncomingAction;
};

export default formatIncoming;
