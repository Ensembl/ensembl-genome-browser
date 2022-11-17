import {
  IncomingAction,
  IncomingActionType,
  UpdateTrackSummaryAction,
  ReportVisibleTranscriptsAction,
  ZmenuContentGene,
  ZmenuContentTranscript
} from '../types';

export type ZmenuContent = (ZmenuContentGene | ZmenuContentTranscript)[];

const formatIncoming = (actionType: IncomingActionType | 'out-of-date', payload: any) => {
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

  if (actionType === 'out-of-date') {
    // This is a temporary code change, which we expect to go away soon.
    // At the moment, genome browser reports that the client version is out of date by sending the "out-of-date" string as an incoming action type.
    // In the future, we expect it to change the message to actionType: 'error', payload: some_json in one of the next releases
    return {
      type: 'out-of-date', // this will become an error type when genome browser learns to send proper error messages
      payload: {
        type: 'BadVersion'
      }
    }
  }

  return {
    type: actionType,
    payload
  } as IncomingAction;
};

export default formatIncoming;
