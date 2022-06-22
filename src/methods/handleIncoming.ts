import {
  IncomingActionType, Subscriptions
} from '../types';
import formatIncoming from './formatIncoming';

const handleIncoming = (subscriptions: Subscriptions, ...action: [type: IncomingActionType | "error", payload: any]) => {

  const [type, payload] = action;

  if (type === "error") {
    console.error(payload);
    return;
  }

  // Track summary payload also has the details about visible transcripts
  // which we will be treating as a separate incoming action of its own.
  if (type === IncomingActionType.TRACK_SUMMARY) {
    handleIncoming(
      subscriptions,
      IncomingActionType.VISIBLE_TRANSCRIPTS,
      payload
    )
  }

  const subscriptionsToAction = subscriptions.get(type);

  if (subscriptionsToAction) {

    const formattedIncoming = formatIncoming(type, payload);
    if (!formattedIncoming) {
      console.error(payload);
      return;
    }

    [...subscriptionsToAction.values()].forEach(subscription => {
      subscription(formattedIncoming);
    })

  }

}


export default handleIncoming;