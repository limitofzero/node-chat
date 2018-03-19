import * as React from 'react';
import Grid from 'material-ui/Grid';
import Message from '../../interfaces/Message';
import MessageWindow from './MessageWindow';
import ContactList from './ContactList';

export default class Chat extends React.Component<any> {
    state = {
        messages: [
            {id: 1, author: 'Jack', text: 'Hello, Piter'},
            {id: 2, author: 'Me', text: 'Hi, Jack'}
        ],
        contacts: [
            {id: 1, avatarUrl: '', name: 'Jact London'},
            {id: 2, avatarUrl: '', name: 'Paul'}
        ]
    }

    render() {
        return <Grid className="chat" container spacing={8}>
                <Grid item xs={12} md={3}>
                    <ContactList list={this.state.contacts}/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <MessageWindow list={this.state.messages}/>
                </Grid>
            </Grid>
    }
}