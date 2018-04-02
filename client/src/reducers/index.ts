import {combineReducers} from 'redux';
import contactReducer from '../reducers/contactReducer';
import connectReducer from '../reducers/connectReducer';
import messageReducer from '../reducers/messageReducer';

const chatReducers = combineReducers({
    contacts: contactReducer,
    connection: connectReducer,
    messages: messageReducer
});

export default chatReducers;