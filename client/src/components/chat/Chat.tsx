import * as React from 'react';
import Grid from 'material-ui/Grid';
import Message from '../../interfaces/Message';
import MessageWindow from './MessageWindow';
import ContactList from './ContactList';
import Paper from 'material-ui/Paper';
import * as io from 'socket.io-client';
import { SOCKET_CONNECTED } from '../../constants/actions';
import '../../styles/components/chat.scss';
import '../../styles/helpers/flexible.scss';


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

    socket: SocketIOClient.Socket = null;

    componentDidMount() {
        if(this.socket === null) {
            this.socket = io.connect('http://localhost:3000');
            this.socket.on(SOCKET_CONNECTED, (obj: any) => {
                console.log(obj);
            });
        }
    }

    render() {
        return <Grid className="chat root__content" container spacing={8}>
                <Grid className="d-flex flex-1" item xs={12} md={3}>
                    <Paper className="flex-1">
                        <ContactList list={this.state.contacts}/>
                    </Paper>
                </Grid>
                <Grid className="d-flex" item xs={12} md={9}>
                    <Paper className="d-flex flex-1">
                        <MessageWindow list={this.state.messages}/>
                    </Paper>
                </Grid>
            </Grid>
    }
}