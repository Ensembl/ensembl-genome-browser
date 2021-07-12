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
```

*NOTE:* By default, the genome browser will get embedded in the dom element with id `browser`.

## Methods
The following are the methods exposed by the GB class.

### send
This method is used to send instruction messages to the GB in the form of actions (explained below).

Example:
```javascript
ensemblGenomeBrowser.send({
  type: OutgoingActionType.SET_FOCUS;
  payload: {
    genomeId: "genome_id";
  };
})
```


### subscribe
This method is used to subscribe to the incoming messages coming from the GB.

The subscribe method takes the following parameters:
- actionTypes: Array of incoming action types
- callback: Function that needs to be called when a particular action is received

Example:
```javascript
ensemblGenomeBrowser.subscribe(
  [incomingActionType.CURRENT_POSITION, incomingActionType.TARGET_POSITION],
  (incomingAction) => doSomething(incomingAction)
)

```

## Actions

Actions are the communication messages sent or received between the genome browser and the external applications.

Actions are classified into two types:
- Outgoing Action
- Incoming Action

An action is an object with two keys `type` & `payload`. 

### Outgoing Actions
These are the actions that can be dispatched to the GB from the external application. They are used to control the GB by sending instructions to it.

Please refer to the `OutgoingActionType` in the `types.ts` file for the list of available outgoing actions.

### Incoming Actions
These are the actions that are dispatched from the GB to the external application. They are used to send updates back to the external applications as a response to the instructions received.

Please refer to the `IncomingActionType` in the `types.ts` file for the list of available incoming actions.

## Links
- Peregrine Repo: https://github.com/Ensembl/ensembl-dauphin-style-compiler


## For Ensembl developers: publishing npm package to the Gitlab registry

Npm is set in this repository to use the gitlab repository https://gitlab.ebi.ac.uk/ensembl-web/package-registry an an npm package registry. See the `publishConfig` field in `package.json` and the `.npmrc` file for the configuration.

The list of published packages can be seen at https://gitlab.ebi.ac.uk/ensembl-web/package-registry/-/packages

In order to publish a new package to the registry:

- Make sure that the version of the package you are about to published has not been published already. If it has, then update the version. 

- Get the **PUBLISH_TOKEN** from the vault

```bash
pass package-publish-token
```

- Use this token when publishing the package manually

```bash
PUBLISH_TOKEN=<token> npm publish
```
