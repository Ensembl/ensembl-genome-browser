import {
  IncomingAction,
  IncomingActionType,
  UpdateTrackSummaryAction,
  ZmenuContentGene,
  ZmenuContentTranscript
} from '../types';

export type ZmenuContent = (ZmenuContentGene | ZmenuContentTranscript)[];

const formatIncoming = (actionType: IncomingActionType, payload: any) => {
  if (
    actionType === IncomingActionType.TRACK_SUMMARY ||
    actionType === IncomingActionType.VISIBLE_TRANSCRIPTS
  ) {
    return {
      type: actionType,
      payload: payload.summary
    } as UpdateTrackSummaryAction;
  }

  // if (actionType === IncomingActionType.VISIBLE_TRANSCRIPTS) {
  //   return {
  //     type: actionType,
  //     payload: {
  //       track_id: 'focus',
  //       transcript_ids: ['bar']
  //     }
  //   } as ReportVisibleTranscriptsAction
  // }

  return {
    type: actionType,
    payload
  } as IncomingAction;
};

export default formatIncoming;
