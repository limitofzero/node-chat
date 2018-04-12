import * as React from 'react';
import { FormControlLabel, Button, Checkbox, TextField } from 'material-ui';

export default class SignInForm extends React.Component<{}> {
    state = {
        login: '',
        password: '',
        rememberMe: false
    }

    handleInputChange = (event: React.FormEvent<HTMLInputElement>, field: string) : void => {
        this.setState({[field]: event.currentTarget.value});
    }

    handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) : void => {
        this.setState({rememberMe: event.currentTarget.checked});
    }

    render() {
        return <form className='sign-in_form'>
            <TextField id='login'
                label='Login'
                margin='normal'
                autoFocus={true}
                className='sing-in_field'
                onChange={(ev) => this.handleInputChange(ev, 'login')}
            />
            <TextField
                id='password'
                label='Password'
                className='sing-in_field'
                type='password'
                autoComplete='current-password'
                margin='normal'
                onChange={(ev) => this.handleInputChange(ev, 'password')}
            />
            <FormControlLabel
                control={
                    <Checkbox
                    onChange={(ev) => this.handleInputChange(ev, 'rememberMe')}
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