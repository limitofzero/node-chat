import * as React from 'react';
import Props from '../../interfaces/MessageWindow';
import Message from './Message';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import '../../styles/components/message-window.scss';

export default class MessageWindow extends React.Component<Props> {
    render() {
        const {list} = this.props;

        return <div className="message-window">
                    <List className="message-window__list">
                        {list.map(ms=> <li key={ms.id}><Message {...ms}/></li>)}
                    </List>
                </div>;
    }
}