import { 
    SubscribeArgs,
    Subscriptions
} from '../types';

const subscribe = (subscriptions: Subscriptions, ...args: SubscribeArgs) => {

  const [actionType, subscriber] = args;
  const subscriptionsToAction = subscriptions.get(actionType);
  if (subscriptionsToAction) {
    subscriptionsToAction.add(subscriber);
  } else {
    subscriptions.set(actionType, new Set([subscriber]));
  }

  const unsubscribe = () => {
    subscriptions.get(actionType)?.delete(subscriber);
  };

  return { 
    unsubscribe
  }
};

export default subscribe;