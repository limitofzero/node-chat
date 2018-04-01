import {SOCKET_CONNECTED, ADD_CONTACT, RECEIVE_CONTACT_LIST} from '../constants/actions';
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

export function receiveContactList(contacts: Contact[]) : Action {
    return {
        type: RECEIVE_CONTACT_LIST,
        payload: { contacts }
    }
}