import * as React from 'react';
import MsgProp from '../../interfaces/Message';

interface Props {
    ms: MsgProp
}

export default class Message extends React.Component<Props> {
    render() {
        const {author, text} = this.props.ms;

        return <div className="message">
            <div className="message__author">{author}</div>
            <div className="message_text">{text}</div>
        </div>;
    }
}