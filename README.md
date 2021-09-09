# Ensembl Genome Browser

This package bundles together compiled version of Ensembl genome browser (GB) along with a javascript communication framework that can be used to embed and control the GB.


## Installation
Using npm:
```
npm i --save https://github.com/Ensembl/ensembl-genome-browser
```

## Creating an instance
```
import EnsemblGenomeBrowser, { OutgoingAction, OutgoingActionType } from 'ensembl-genome-browser';
const ensemblGenomeBrowser = new EnsemblGenomeBrowser();
await ensemblGenomeBrowser.init();

const action: OutgoingAction = {
      type: OutgoingActionType.SET_FOCUS,
      payload: {
        focus: 'focus_id',
        genomeId: 'genome_id'
      }
    };

ensemblGenomeBrowser.send(action);
```

*NOTE:* By default, the genome browser will get embeded to the dom element with id `browser`.

## Actions

Actions are the communication messages sent or received between the genome browser and the client side application.

Actions are classified into two types:
- Outgoing Action
- Incoming Action

An action is an object with two keys `type` & `payload`.

### Outgoing Actions
These are the actions that

PING
ACTIVATE_BROWSER
MOVE_DOWN
MOVE_LEFT
MOVE_RIGHT
MOVE_UP
SET_FOCUS
SET_FOCUS_LOCATION
TOGGLE_TRACKS
TURN_ON_TRACKS
TURN_OFF_TRACKS
TURN_ON_LABELS
TURN_OFF_LABELS
ZMENU_ACTIVITY_OUTSIDE
ZMENU_ENTER
ZMENU_LEAVE
ZOOM_IN
ZOOM_OUT

## Support
TODO


## Keywords
TODO