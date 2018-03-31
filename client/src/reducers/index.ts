import {combineReducers} from 'redux';
import contactReducer from '../reducers/contactReducer';
import connectReducer from '../reducers/connectReducer';

const chatReducers = combineReducers({
    contacts: contactReducer,
    connection: connectReducer
});

export default chatReducers;