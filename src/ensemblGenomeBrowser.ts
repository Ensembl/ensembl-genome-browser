import { OutgoingAction, OutgoingActionType } from './action';
import init, { 
  GenomeBrowser
} from './peregrine/peregrine_ensembl.js';

const subscriptions = new Map<string, Set<() => MessageEvent>>();

type GenomeBrowserType = {
  go: () => void,
  set_stick: (stickId:  string) => void,
  set_bp_per_screen: (bpPerScreen: number) => void,
  set_x: (x: number) => void,
  set_y: (y: number) => void,
  set_switch: (path: string[]) => void
  clear_switch: (path: string[]) => void
  set_message_reporter: ( callback: (x: any) => void) => void
}

class EnsemblGenomeBrowser {

  private elementId = '';
  genomeBrowser: GenomeBrowserType | null = null;
  bpPerScreen = 1000000;
  x = 2500000;
  y = 0;
  inited = false;

   constructor (elementId: string) {
    this.elementId = elementId;
    this.subscribeToActions();
  }

  public async init() {

    if(!this.inited) {
      await init();
      this.genomeBrowser = new GenomeBrowser();
      this.genomeBrowser?.go();  
    }
    this.inited = true;
    
    this.genomeBrowser?.set_stick("homo_sapiens_GCA_000001405_27:1");
    this.genomeBrowser?.set_switch(["track"])
    this.genomeBrowser?.set_x(this.x);
    this.genomeBrowser?.set_bp_per_screen(this.bpPerScreen);
    this.genomeBrowser?.set_message_reporter(this.handleIncoming);
  }

  private subscribeToActions() {
    window.addEventListener('message', this.handleAction);
  }

  private handleAction = (event: MessageEvent) => {

    // const { action, payload } = event.data as IncomingMessageEventData;

    // const type = action;
    // const subscriptionsToAction = subscriptions.get(`${this.elementId}-${type}`);

    // subscriptionsToAction?.forEach(fn => fn(payload));
  }

  public handleIncoming = (message: unknown) => {

    console.log(message);
  }
  


  public send = async (action: OutgoingAction) => {

    console.log(action);
    
    const type: any = action.type;

    if( type === OutgoingActionType.ACTIVATE_BROWSER ) {
      
      this.init();
      return;
    }

   if(action.type === OutgoingActionType.SET_FOCUS) {

      // this.genomeBrowser?.set_stick(action.payload?.focus as string)
      this.genomeBrowser?.set_stick("homo_sapiens_GCA_000001405_27:1");
    
    } if(action.type === OutgoingActionType.SET_FOCUS_LOCATION) {

      const {startBp, endBp} = action.payload;

      this.genomeBrowser?.set_x(startBp);
      this.x = startBp;

      this.genomeBrowser?.set_bp_per_screen(endBp - startBp);
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
      this.genomeBrowser?.set_bp_per_screen(this.bpPerScreen)
    
    } else if(action.type === OutgoingActionType.ZOOM_OUT){

      this.bpPerScreen = this.bpPerScreen + 10000;
      this.genomeBrowser?.set_bp_per_screen(this.bpPerScreen)

    } else if(action.type === OutgoingActionType.MOVE_LEFT){

      this.x = this.x + 10000;
      this.genomeBrowser?.set_x(this.x);
    
    } else if(action.type === OutgoingActionType.MOVE_RIGHT){

      this.x = this.x - 10000;
      this.genomeBrowser?.set_x(this.x);
    
    } else if(action.type === OutgoingActionType.MOVE_UP){

      this.y = this.y + 10;
      this.genomeBrowser?.set_y(this.y);
    
    } else if(action.type === OutgoingActionType.MOVE_DOWN){

      this.y = this.y - 10;
      this.genomeBrowser?.set_y(this.y);
    
    }


  };
  
  public subscribe = (action: string, callback: () => MessageEvent) => {
    
    const subscriptionsToAction = subscriptions.get(`${this.elementId}-${action}`);
    if (subscriptionsToAction) {
      subscriptionsToAction.add(callback);
    } else {
      subscriptions.set(action, new Set([callback]));
    }
  
    return {
      unsubscribe() {
        subscriptionsToAction?.delete(callback)
      }
    }
  };

  public getElementId = () => this.elementId;

  
}

export default EnsemblGenomeBrowser;
