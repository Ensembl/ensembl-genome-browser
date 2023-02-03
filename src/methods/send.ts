import {
  OutgoingActionType,
  type GenomeBrowserType,
  type OutgoingAction,
  type BrowserSetFocusAction
} from '../types';

const send = (
  genomeBrowser: GenomeBrowserType,
  action: OutgoingAction
) => {
  if (action.type === OutgoingActionType.SET_FOCUS) {
    setFocusObject(action.payload, genomeBrowser);
  } else if (action.type === OutgoingActionType.SET_FOCUS_LOCATION) {
    // This action fires when we want to set both (1) the focus object, and
    // (2) the location where the user is, which may or may not be the same as the location of the focus object
    const { chromosome, startBp, endBp, genomeId, focus } = action.payload;
    genomeBrowser.set_stick(`${genomeId}:${chromosome}`);

    if (focus) {
      setFocusObject({ genomeId, focusId: focus.id, focusType: focus.type }, genomeBrowser);
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
  } else if (action.type === OutgoingActionType.MARK_TRACK_GROUP) {
    genomeBrowser.switch(['settings', 'tab-selected'], action.payload.track_group);
  }
};

const setFocusObject = (payload: BrowserSetFocusAction['payload'], genomeBrowser: GenomeBrowserType) => {
  const { focusType } = payload;

  if (focusType === 'gene') {
    setFocusGene(payload, genomeBrowser);
  } else if (focusType === 'location') {
    setFocusLocation(payload, genomeBrowser);
  }
};

const setFocusGene = (payload: BrowserSetFocusAction['payload'], genomeBrowser: GenomeBrowserType) => {
  const { genomeId, focusId, bringIntoView } = payload;

  if (bringIntoView) {
    genomeBrowser.jump(`focus:gene:${genomeId}:${focusId}`);
    genomeBrowser.wait();
  }

  genomeBrowser.switch(['track', 'focus'], true);
  genomeBrowser.switch(['track', 'focus', 'label'], true);
  genomeBrowser.switch(['track', 'focus', 'item', 'gene'], {
    'genome_id': genomeId,
    'item_id': focusId
  });
};

const setFocusLocation = (payload: BrowserSetFocusAction['payload'], genomeBrowser: GenomeBrowserType) => {
  const { genomeId, focusId, bringIntoView } = payload;
  const locationRegex = /(.+):(\d+)-(\d+)/;
  const [, regionName, start, end] = locationRegex.exec(focusId) ?? [];
  if (!regionName || !start || !end) {
    return;
  }

  const startNum = parseInt(start);
  const endNum = parseInt(end);

  genomeBrowser.switch(['track', 'focus'], true);
  genomeBrowser.switch(['track', 'focus', 'item', 'location'], {
    genome_id: genomeId,
    region_name: regionName,
    start: startNum,
    end: endNum
  });

  if (bringIntoView) {
    genomeBrowser.set_stick(`${genomeId}:${regionName}`);
    genomeBrowser.goto(startNum, endNum);
  }
};

export default send;
