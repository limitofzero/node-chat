import Contact from '../interfaces/Contact';
import Action from '../interfaces/PayloadAction';
import {ADD_CONTACT, DELETE_CONTACT, RECEIVE_CONTACT_LIST} from '../constants/actions';

const initialState: Contact[] = [];

function contactReducer(state: Contact[] = initialState, action: Action): Contact[]  {
    const {type, payload} = action;
    switch(type) {
        case ADD_CONTACT:
            return state.concat(payload.contact);
        case DELETE_CONTACT:
            return state.filter(con => con.id !== payload.id);
        case RECEIVE_CONTACT_LIST:
            return payload.contacts;
        default:
            return state;
    }
}

export default contactReducer;