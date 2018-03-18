import * as React from 'react';
import Grid from 'material-ui/Grid';
import Message from '../../interfaces/Message';
import MessageWindow from './MessageWindow';

export default class Chat extends React.Component<any> {
    state = {
        messages: [
            {id: 1, author: 'Jack', text: 'Hello, Piter'},
            {id: 2, author: 'Me', text: 'Hi, Jack'}
        ]
    }

    render() {
        return <Grid className="chat" container spacing={8}>
                <Grid item xs={12} md={3}>
                </Grid>
                <Grid item xs={12} md={9}>
                    <MessageWindow list={this.state.messages}/>
                </Grid>
                
            </Grid>
    }
}