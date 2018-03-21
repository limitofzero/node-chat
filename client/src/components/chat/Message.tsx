import * as React from 'react';
import Props from '../../interfaces/Message';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';

export default class Message extends React.Component<Props> {
    render() {
        const {author, text} = this.props;
        
        return <Paper className="message">
            <ListItem>
                <div className="message__author">{author}</div>
                <div className="message_text">{text}</div>
            </ListItem>
        </Paper>;
    }
}