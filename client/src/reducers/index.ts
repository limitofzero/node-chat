import {combineReducers} from 'redux';
import contactReducer from '../reducers/contactReducer';
import connectReducer from '../reducers/connectReducer';

const chatReducers = combineReducers({
    contactReducer,
    connectReducer
});

export default chatReducers;