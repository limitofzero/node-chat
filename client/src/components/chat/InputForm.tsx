import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../../styles/components/input-form.scss';
import '../../styles/utils/margins.scss';

export default class InputForm extends React.Component<{}> {
    state = {text: ''};

    render() {
        return <div className='input-form'>
            <div className='input-form__text'>
                <TextField
                    multiline
                    placeholder="Write message..."
                    rows="3"
                    rowsMax="3"
                    fullWidth
                    value={this.state.text}
                />
            </div>
            <div className='d-flex'>
                <Button  color="primary" className='ml-auto'>
                    Send
                </Button>
            </div>
        </div>
    }
}