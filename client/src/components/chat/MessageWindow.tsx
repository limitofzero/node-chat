import * as React from 'react';
import Props from '../../interfaces/MessageWindow';
import Message from './Message';
import Paper from 'material-ui/Paper';
import InputForm from './InputForm';
import '../../styles/components/message-window.scss';

export default class MessageWindow extends React.Component<Props> {
    render() {
        const {list} = this.props;

        return <div className="message-window">
                    <ul className="message-window__list">
                        {list.map(ms => <Paper className="message-window__message">
                            <Message key={ms.id} {...ms}/></Paper>)}
                    </ul>
                    <InputForm/>
                </div>;
    }
}