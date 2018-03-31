import Contact from '../interfaces/Contact';
import ConnectState from '../interfaces/ConnectState';
import Action from '../interfaces/PayloadAction';
import {SOCKET_CONNECTED} from '../constants/actions';

const initialState : ConnectState  = {
    account: null,
    connected: false
};

function connectReducer(state: ConnectState = initialState, action: Action) {
    const {type, payload} = action;
    switch(type) {
        case SOCKET_CONNECTED:
            return Object.assign({}, state, {account: payload.account, connected: true});
        default:
            return state;
    }
}

export default connectReducer;