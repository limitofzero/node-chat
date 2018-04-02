import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import Message from '../../interfaces/Message';
import {Dispatch} from 'redux';
import Props from '../../interfaces/InputForm';
import {sendMessage} from '../../actions/socketActions';
import '../../styles/components/input-form.scss';
import '../../styles/utils/margins.scss';

class InputForm extends React.Component<Props> {
    state = {text: ''};

    handleInputChange = (event: React.FormEvent<HTMLInputElement>) : void => {
        this.setState({text: event.currentTarget.value});
    }

    sendMessage = () => {
        const {text} = this.state;
        if(text) {
            this.props.sendMessage(text);
        }
    }

    render() {
        return <div className='input-form'>
            <div className='input-form__text'>
                <TextField
                    multiline
                    placeholder="Write message..."
                    rows="3"
                    rowsMax="3"
                    fullWidth
                    onChange={this.handleInputChange}
                    value={this.state.text}
                />
            </div>
            <div className='d-flex'>
                <Button color="primary" 
                        className='ml-auto'
                        onClick={this.sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) : {sendMessage: Function} {
    return {
        sendMessage: (msg: Message) => dispatch(sendMessage(msg))
    }
}

export default connect(null, mapDispatchToProps)(InputForm);