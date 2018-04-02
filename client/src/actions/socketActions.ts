import {SOCKET_CONNECTED, ADD_CONTACT, RECEIVE_CONTACT_LIST, DELETE_CONTACT, SEND_MESSAGE, RECEIVE_MESSAGE} from '../constants/actions';
import Contact from '../interfaces/ContactList';
import Action from '../interfaces/PayloadAction';
import Message from '../interfaces/Message';
import Websock from '../services/websock';

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

export function deleteContact(deletedContact: {id: string}) : Action {
    return {
        type: DELETE_CONTACT,
        payload: deletedContact
    }
}

export function sendMessage(message: string) : Action {
    Websock.sendMessage(message);

    return {
        type: SEND_MESSAGE,
        payload: { message }
    }
}

export function receiveMessage(message: Message) : Action {
    return {
        type: RECEIVE_MESSAGE,
        payload: { message }
    }
}