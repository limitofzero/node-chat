import {SOCKET_CONNECTED} from '../constants/actions';
import Contact from '../interfaces/ContactList';
import Action from '../interfaces/PayloadAction';

export function socketConnected(account: Contact) : Action {
    return {
        type: SOCKET_CONNECTED,
        payload: { account }
    }
}