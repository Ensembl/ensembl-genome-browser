import { 
  IncomingAction, IncomingActionType, OutgoingAction, OutgoingActionType, Subscribe
} from './types';

const subscriptions = new Map<IncomingActionType, Set<(action: any) => void>>();

type GenomeBrowserType = {
  go: (config_object: any) => void;
  set_stick: (stickId: string) => void;
  wait: () => void;
  goto: (left: number, right: number) => void;
  jump: (location: string) => void;
  set_y: (y: number) => void;
  set_switch: (path: string[]) => void;
  clear_switch: (path: string[]) => void;
  set_message_reporter: (callback: (...action: [type: IncomingActionType, payload: any]) => void) => void;
};


type ConfigData = {
  backend_url?: string;
  target_element_id?: string;
  "debug.show-incoming-messages"?: string;
}
class EnsemblGenomeBrowser {
  
  genomeBrowser: GenomeBrowserType | null = null;
  inited = false;

  public async init(config: ConfigData = {}) {

    if(!this.inited) {
      const { default: init, GenomeBrowser } = await import('./peregrine/peregrine_ensembl.js');
      await init();
      this.genomeBrowser = new GenomeBrowser();
      this.genomeBrowser?.go(config);
    }
    this.inited = true;
    
    this.genomeBrowser?.set_message_reporter(this.handleIncoming);
  }

  public formatIncoming = (actionType: IncomingActionType, payload: any) => {

    if (actionType === IncomingActionType.TRACK_SUMMARY) {

        return {
          type: actionType,
          payload: payload.summary
        } as IncomingAction
    } else if (actionType === IncomingActionType.ZMENU_CREATE) {

        const id = payload.content[0].metadata.transcript_id;
        const unversioned_id = id.split('.')[0];
        return {
          type: actionType,
          payload: {
            id,
            unversioned_id,
            anchor_coordinates: {x: payload.x, y : payload.y},
            content: payload.content
          }
        } as IncomingAction

    }

    return {
      type: actionType,
      payload
    } as IncomingAction

  }

  public handleIncoming = (...action: [type: IncomingActionType | "error", payload: any]) => {

    const [type, payload] = action;

    if( type === "error"){
      console.error(payload);
      return;
    }

    const subscriptionsToAction = subscriptions.get(type);

    if (subscriptionsToAction) {
      
      [...subscriptionsToAction.values()].forEach( subscription => {
        subscription(this.formatIncoming(type, payload));
      })

    }

  }

  public send = async (action: OutgoingAction) => {

    if(!this.genomeBrowser){
      return;
    }

   if(action.type === OutgoingActionType.SET_FOCUS) {
      
    const {genomeId, focus } = action.payload;

      
      if(!action.payload.focus){
        return;
      }
      this.genomeBrowser.jump(`focus:${genomeId}:${focus}`);
      this.genomeBrowser.wait();
      this.genomeBrowser.set_switch(["track"])
      this.genomeBrowser.set_switch(["track","focus"])
      this.genomeBrowser.set_switch(["track","focus","label"])

      this.genomeBrowser.set_switch(["focus","gene"])
      this.genomeBrowser.set_switch(["focus","gene", focus])

    } if(action.type === OutgoingActionType.SET_FOCUS_LOCATION) {

      const { startBp, endBp} = action.payload;

      if(!action.payload.focus){
        this.genomeBrowser.jump(`focus:${action.payload.genomeId}:${action.payload.focus}`);
        this.genomeBrowser.wait();
      }

      this.genomeBrowser.goto(startBp, endBp);
    
    } else if(action.type === OutgoingActionType.TURN_ON_TRACKS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser.set_switch(["track",track_id])
        this.genomeBrowser.set_switch(["track",track_id,"label"])
      }
    } else if(action.type === OutgoingActionType.TURN_OFF_TRACKS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser.clear_switch(["track",track_id])
        this.genomeBrowser.clear_switch(["track",track_id,"label"])
      }
    }  else if(action.type === OutgoingActionType.TURN_ON_LABELS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser.set_switch(["track",track_id,"label"])
      }
    } else if(action.type === OutgoingActionType.TURN_OFF_LABELS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser.clear_switch(["track",track_id,"label"])
      }
    } else if(action.type === OutgoingActionType.TURN_ON_NAMES){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser.set_switch(["track",track_id,"name"])
      }
    } else if(action.type === OutgoingActionType.TURN_OFF_NAMES){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser.clear_switch(["track",track_id,"name"])
      }
    } 
  };
  
  public subscribe: Subscribe = (actionType, subscriber) => {

      const subscriptionsToAction = subscriptions.get(actionType);
      if (subscriptionsToAction) {
        subscriptionsToAction.add(subscriber);
      } else {
        subscriptions.set(actionType, new Set([subscriber]));
      }

    return {
      unsubscribe() {
        subscriptions.get(actionType)?.delete(subscriber);
      }
    }
  };
 
}

export * from './types';

export default EnsemblGenomeBrowser;
