import Message from '../interfaces/Message';
import {SEND_MESSAGE, RECEIVE_MESSAGE} from '../constants/actions';
import Action from '../interfaces/PayloadAction';

const initialState: Message[] = [];

function messageReducer(state: Message[] = initialState, action: Action) {
    const {type, payload} = action;

    switch(type) {
        case RECEIVE_MESSAGE:
            return state.concat(payload.message);
        default: 
            return state;
    }
}

export default messageReducer;