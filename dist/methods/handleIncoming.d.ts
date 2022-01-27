import { IncomingActionType, Subscriptions } from '../types';
declare const handleIncoming: (subscriptions: Subscriptions, action: [type: "error" | IncomingActionType, payload: any]) => void;
export default handleIncoming;
