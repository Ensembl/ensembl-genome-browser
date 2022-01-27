import { 
    IncomingActionType, Subscriptions
} from '../types';
import formatIncoming from './formatIncoming';

const handleIncoming = (subscriptions: Subscriptions, action: [type: IncomingActionType | "error", payload: any]) => {

    const [type, payload] = action;

    if( type === "error"){
        console.error(payload);
        return;
    }

    const subscriptionsToAction = subscriptions.get(type);

    if (subscriptionsToAction) {
        
        [...subscriptionsToAction.values()].forEach( subscription => {
        
        const formattedIncoming = formatIncoming(type, payload);
        if(!formattedIncoming){
            console.error(payload);
            return;
        }
        subscription(formattedIncoming);
        })

    }

}


export default handleIncoming;