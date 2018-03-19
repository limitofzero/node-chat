import * as React from 'react';
import Chat from './chat/Chat';
import Grid from 'material-ui/Grid';
import "../styles/common.scss";
import "../styles/components/root.scss";

export default class Root extends React.Component<any> {
    render() {
        return <div className="root">
            <Chat/>
        </div>
    }
}
