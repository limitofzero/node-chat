import * as React from 'react';
import Props from '../../interfaces/Message';

export default class Message extends React.Component<Props> {
    render() {
        const {author, text} = this.props;
        
        return <div className="message">
            <div className="message__author">{author}</div>
            <div className="message_text">{text}</div>
        </div>;
    }
}