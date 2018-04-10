import * as React from 'react';
import {Provider} from 'react-redux';
import store from '../store';
import Chat from './chat/Chat';
import Grid from 'material-ui/Grid';
import "../styles/common.scss";
import "../styles/components/root.scss";
import { Route } from 'react-router';
import SignInForm from './signInForm/SignInForm';

export default class Root extends React.Component<any> {
    render() {
        return <Provider store={store}>
                <div className="root">
                    <Route exact path='/' component={Chat}/>
                    <Route path='/login' component={SignInForm}/>
                </div>
            </Provider>;
    }
}
