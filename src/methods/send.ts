import { GenomeBrowserType } from '../types';
import { OutgoingAction, OutgoingActionType } from '../types';

const send = async (
  genomeBrowser: GenomeBrowserType,
  action: OutgoingAction
) => {
  if (action.type === OutgoingActionType.SET_FOCUS) {
    const { genomeId, focus, shouldJump } = action.payload;

    if (shouldJump) {
      genomeBrowser.jump(`focus:${genomeId}:${focus}`);
      genomeBrowser.wait();
    }

    genomeBrowser.switch(['track', 'focus'], true);
    genomeBrowser.switch(['track', 'focus', 'label'], true);
    genomeBrowser.switch(['track', 'focus', 'item', 'gene'], focus);
  } else if (action.type === OutgoingActionType.SET_FOCUS_LOCATION) {
    const { chromosome, startBp, endBp, genomeId, focus } = action.payload;

    genomeBrowser.set_stick(`${genomeId}:${chromosome}`);
    genomeBrowser.wait();

    if (focus) {
      genomeBrowser.switch(['track', 'focus'], true);
      genomeBrowser.switch(['track', 'focus', 'item', 'gene'], focus);
    }

    genomeBrowser.goto(startBp, endBp);
  } else if (action.type === OutgoingActionType.TURN_ON_TRACKS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id], true);
      genomeBrowser.switch(['track', track_id, 'label'], true);
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_TRACKS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id], false);
      genomeBrowser.switch(['track', track_id, 'label'], false);
    }
  } else if (action.type === OutgoingActionType.TURN_ON_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'label'], true);
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'label'], false);
    }
  } else if (action.type === OutgoingActionType.TURN_ON_NAMES) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'name'], true);
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_NAMES) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'name'], false);
    }
  } else if (action.type === OutgoingActionType.TURN_ON_SEVERAL_TRANSCRIPTS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'several'], true);
      if (track_id === 'focus') {
        // reset transcripts and rely on the genome browser to figure them out
        genomeBrowser.switch(['track', 'focus', 'enabled-transcripts'], null);
      }
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_SEVERAL_TRANSCRIPTS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'several'], false);
      if (track_id === 'focus') {
        // reset transcripts and rely on the genome browser to figure them out
        genomeBrowser.switch(['track', 'focus', 'enabled-transcripts'], null);
      }
    }
  } else if (action.type === OutgoingActionType.SET_VISIBLE_TRANSCRIPTS) {
    const { track_id, transcript_ids } = action.payload;
    genomeBrowser.switch(
      ['track', track_id, 'enabled-transcripts'],
      transcript_ids
    );
  } else if (action.type === OutgoingActionType.TURN_ON_TRANSCRIPT_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'transcript-label'], true);
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_TRANSCRIPT_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.switch(['track', track_id, 'transcript-label'], false);
    }
  }
};

export default send;
