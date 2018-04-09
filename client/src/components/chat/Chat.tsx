import * as React from 'react';
import Grid from 'material-ui/Grid';
import Message from '../../interfaces/Message';
import MessageWindow from './MessageWindow';
import ContactList from './ContactList';
import Paper from 'material-ui/Paper';
import Props from '../../interfaces/Chat';
import WebsockService from '../../services/websock';
import '../../styles/components/chat.scss';
import '../../styles/helpers/flexible.scss';
import '../../styles/utils/overflow.scss';
import { connect } from 'react-redux';
import Header from '../Header';

class Chat extends React.Component<Props> {

    componentDidMount() {
        WebsockService.connect();
    }

    render() {
        const {contacts, messages} = this.props;

        return <div className="d-flex d-flex-column flex-1">
                <Header/>
                <Grid className="chat root__content" container spacing={8}>
                        <Grid className="d-flex flex-1" item xs={12} md={3}>
                            <Paper className="flex-1 u-overflow-auto">
                                <ContactList list={contacts}/>
                            </Paper>
                        </Grid>
                        <Grid className="d-flex" item xs={12} md={9}>
                            <Paper className="d-flex flex-1">
                                <MessageWindow list={messages}/>
                            </Paper>
                        </Grid>
                    </Grid>
            </div>
    }
}

function mapStateToPtops(state: any) : Props {
    return {
        contacts: state.contacts,
        messages: state.messages
    }
}

export default connect(mapStateToPtops)(Chat);