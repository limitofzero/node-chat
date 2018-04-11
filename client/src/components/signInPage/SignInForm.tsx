import * as React from 'react';
import { FormControlLabel, Button, Checkbox, TextField } from 'material-ui';

export default class SignInForm extends React.Component<{}> {

    render() {
        return <form className='sign-in_form'>
            <TextField id='login'
                label='Login'
                margin='normal'
                className='sing-in_field'
            />
            <TextField
                id='password'
                label='Password'
                className='sing-in_field'
                type='password'
                autoComplete='current-password'
                margin='normal'
            />
            <FormControlLabel
                control={
                    <Checkbox
                    checked={false}
                    value='false'
                    />
                }
                label='Remember me'
            />
            <Button variant='raised'
                    className='ml-auto' 
                    color='secondary'>
                        Login
            </Button>
        </form>
    }
}