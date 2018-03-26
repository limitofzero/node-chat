import * as React from 'react';
import {Provider} from 'react-redux';
import store from '../store';
import Chat from './chat/Chat';
import Grid from 'material-ui/Grid';
import "../styles/common.scss";
import "../styles/components/root.scss";
import Header from './Header';

export default class Root extends React.Component<any> {
    render() {
        return <Provider store={store}>
                <div className="root">
                    <Header/>
                    <Chat/>
                </div>
            </Provider>;
    }
}
