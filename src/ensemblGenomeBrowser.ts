import { IncomingAction, IncomingActionType, OutgoingAction, OutgoingActionType } from './action';
import init, { 
  GenomeBrowser
} from './peregrine/peregrine_generic.js';

const subscriptions = new Map<IncomingActionType, Set<(action: IncomingAction) => void>>();
type Callback = (action: IncomingAction) => void;
class EnsemblGenomeBrowser {
  
  genomeBrowser: GenomeBrowser | null = null;
  bpPerScreen = 1000000;
  x = 2500000;
  y = 0;
  inited = false;

  public async init() {

    if(!this.inited) {
      await init();
      this.genomeBrowser = new GenomeBrowser();
      this.genomeBrowser?.go({});  
    }
    this.inited = true;
    
    this.genomeBrowser?.set_stick("homo_sapiens_GCA_000001405_27:17");
    this.genomeBrowser?.set_switch(["track"])
    this.genomeBrowser?.set_switch(["track","gene-pc-fwd"]);
    this.genomeBrowser?.set_switch(["track","gene-nonpc-fwd"]);
    this.genomeBrowser?.set_switch(["track","gene-nonpc-rev"]);
    this.genomeBrowser?.set_switch(["track","gene-nonpc-fwd","label"]);
    this.genomeBrowser?.set_switch(["track","gene-nonpc-rev","label"]);
    this.genomeBrowser?.set_switch(["track","gc"]);
    this.genomeBrowser?.set_switch(["track","contig"]);
    this.genomeBrowser?.goto(2000000,3000000);
    this.genomeBrowser?.set_switch(["settings"]);
    this.genomeBrowser?.set_message_reporter(this.handleIncoming);
  }

  public handleIncoming = (actionType: IncomingActionType,...more: any) => {

    const subscriptionsToAction = subscriptions.get(actionType);

    if (subscriptionsToAction) {
      subscriptionsToAction.forEach( subscription => {
        subscription({
          type: actionType,
          payload: more
        } as IncomingAction)
      })

    }

  }

  public send = async (action: OutgoingAction) => {

    const type: any = action.type;

    if( type === OutgoingActionType.ACTIVATE_BROWSER ) {
      
      this.init();
      return;
    }

   if(action.type === OutgoingActionType.SET_FOCUS) {
      
      this.genomeBrowser?.set_stick(action.payload?.focus as string)
    
    } if(action.type === OutgoingActionType.SET_FOCUS_LOCATION) {

      const {stick, startBp, endBp} = action.payload;

      this.genomeBrowser?.set_stick(stick);
      this.genomeBrowser?.goto(startBp, endBp);
      this.x = startBp;
      this.bpPerScreen = endBp - startBp;
    
    } else if(action.type === OutgoingActionType.TURN_ON_TRACKS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser?.set_switch(["track",track_id])
        this.genomeBrowser?.set_switch(["track",track_id,"label"])
      }
    } else if(action.type === OutgoingActionType.TURN_OFF_TRACKS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser?.clear_switch(["track",track_id])
        this.genomeBrowser?.clear_switch(["track",track_id,"label"])
      }
    }  else if(action.type === OutgoingActionType.TURN_ON_LABELS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser?.set_switch(["track",track_id,"label"])
      }
    } else if(action.type === OutgoingActionType.TURN_OFF_LABELS){
      for(const track_id of action.payload.track_ids) {
        this.genomeBrowser?.clear_switch(["track",track_id,"label"])
      }
    } else if(action.type === OutgoingActionType.ZOOM_IN){

      this.bpPerScreen = this.bpPerScreen - 10000;
      this.genomeBrowser?.goto(this.x, (this.x + this.bpPerScreen));
    
    } else if(action.type === OutgoingActionType.ZOOM_OUT){

      this.bpPerScreen = this.bpPerScreen + 10000;
      this.genomeBrowser?.goto(this.x, (this.x + this.bpPerScreen));

    } else if(action.type === OutgoingActionType.MOVE_LEFT){

      this.x = this.x + 10000;
      this.genomeBrowser?.goto(this.x, (this.x + this.bpPerScreen));
    
    } else if(action.type === OutgoingActionType.MOVE_RIGHT){

      this.x = this.x - 10000;
      this.genomeBrowser?.goto(this.x, (this.x + this.bpPerScreen));
    
    } else if(action.type === OutgoingActionType.MOVE_UP){

      this.y = this.y + 10;
      this.genomeBrowser?.set_y(this.y);
    
    } else if(action.type === OutgoingActionType.MOVE_DOWN){

      this.y = this.y - 10;
      this.genomeBrowser?.set_y(this.y);
    
    }


  };
  
  public subscribe = (actionTypes: IncomingActionType[], callback: Callback) => {

    actionTypes.forEach( actionType => {
      const subscriptionsToAction = subscriptions.get(actionType);
      if (subscriptionsToAction) {
        subscriptionsToAction.add(callback);
      } else {
        subscriptions.set(actionType, new Set([callback]));
      }

    })

    return {
      unsubscribe() {
        
        actionTypes.forEach( actionType => {
          subscriptions.get(actionType)?.delete(callback);

        })
      }
    }
  };

  
}

export default EnsemblGenomeBrowser;
