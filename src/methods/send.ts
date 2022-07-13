import { GenomeBrowserType } from '../types';
import {
  OutgoingAction,
  OutgoingActionType
} from '../types';

const send = async (genomeBrowser: GenomeBrowserType, action: OutgoingAction) => {

  if (action.type === OutgoingActionType.SET_FOCUS) {

    const { genomeId, focus } = action.payload;


    if (!action.payload.focus) {
      return;
    }
    genomeBrowser.jump(`focus:${genomeId}:${focus}`);
    genomeBrowser.wait();
    genomeBrowser.set_switch(["track"])
    genomeBrowser.set_switch(["track", "focus"])
    genomeBrowser.set_switch(["track", "focus", "label"])

    genomeBrowser.set_switch(["focus", "gene"])
    genomeBrowser.set_switch(["focus", "gene", focus])

  } if (action.type === OutgoingActionType.SET_FOCUS_LOCATION) {

    const { chromosome, startBp, endBp, genomeId, focus } = action.payload;

    genomeBrowser.set_stick(`${genomeId}:${chromosome}`);
    genomeBrowser.wait();
    if (focus) {
      genomeBrowser.set_switch(["track"])
      genomeBrowser.set_switch(["track", "focus"])

      genomeBrowser.set_switch(["focus", "gene"])
      genomeBrowser.set_switch(["focus", "gene", focus])
    }

    genomeBrowser.goto(startBp, endBp);

  } else if (action.type === OutgoingActionType.TURN_ON_TRACKS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.set_switch(["track", track_id])
      genomeBrowser.set_switch(["track", track_id, "label"])
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_TRACKS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.clear_switch(["track", track_id])
      genomeBrowser.clear_switch(["track", track_id, "label"])
    }
  } else if (action.type === OutgoingActionType.TURN_ON_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.set_switch(["track", track_id, "label"])
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.clear_switch(["track", track_id, "label"])
    }
  } else if (action.type === OutgoingActionType.TURN_ON_NAMES) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.set_switch(["track", track_id, "name"])
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_NAMES) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.clear_switch(["track", track_id, "name"])
    }
  } else if (action.type === OutgoingActionType.TURN_ON_SEVERAL_TRANSCRIPTS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.set_switch(["track", track_id, "several"])
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_SEVERAL_TRANSCRIPTS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.clear_switch(["track", track_id, "several"])
    }
  } else if (action.type === OutgoingActionType.SET_VISIBLE_TRANSCRIPTS) {
    const { track_id, transcript_ids } = action.payload;
    genomeBrowser.set_switch(["track", track_id, "enabled-transcripts", JSON.stringify(transcript_ids)]);

  } else if (action.type === OutgoingActionType.TURN_ON_TRANSCRIPT_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.set_switch(["track", track_id, "transcript-label"])
    }
  } else if (action.type === OutgoingActionType.TURN_OFF_TRANSCRIPT_LABELS) {
    for (const track_id of action.payload.track_ids) {
      genomeBrowser.clear_switch(["track", track_id, "transcript-label"])
    }
  }
};

export default send;