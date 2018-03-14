import * as React from 'react';
import MsgProp from '../../interfaces/Message';
import Message from './Message';

interface Props {
    messages: Array<MsgProp>
}

export default class MessageWindow extends React.Component<Props> {
    render() {
        const {messages} = this.props;

        return <div className="message-window">
            <ul className="list">
                {messages.map(ms=> <li><Message ms={ms}/></li>)}
            </ul>;
        </div>
    }
}