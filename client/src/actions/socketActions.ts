import {SOCKET_CONNECTED, ADD_CONTACT} from '../constants/actions';
import Contact from '../interfaces/ContactList';
import Action from '../interfaces/PayloadAction';

export function socketConnected(account: Contact) : Action {
    return {
        type: SOCKET_CONNECTED,
        payload: { account }
    }
}

export function addContact(contact: Contact) : Action {
    return {
        type: ADD_CONTACT,
        payload: { contact }
    }
}