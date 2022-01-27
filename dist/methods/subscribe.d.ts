import { SubscribeArgs, Subscriptions } from '../types';
declare const subscribe: (subscriptions: Subscriptions, args: SubscribeArgs) => {
    unsubscribe: () => void;
};
export default subscribe;
