import {RECEIVE_NAME, SOCKET_CONNECTED} from '../constants/actions';
import Contact from '../interfaces/ContactList';
import Action from '../interfaces/PayloadAction';

export function socketConnected() : Action {
    return {
        type: SOCKET_CONNECTED,
        payload: { connected: true }
    }
}

export function receiveName(user: Contact) : Action {
    return {
        type: RECEIVE_NAME,
        payload: { user }
    }
}