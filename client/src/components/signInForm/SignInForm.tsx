import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import '../../styles/components/sign-in.scss';
import { 
    FormControlLabel, 
    Button, 
    Checkbox, 
    TextField, 
    Typography,
    Divider
 } from 'material-ui';

export default class SingInForm extends React.Component<{}> {
    render() {
        return <Grid container justify='center' spacing={24}>
            <Grid item direction='column' sm={8} xs={11} md={6} lg={4}>
                <Paper>
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography variant='title' color='inherit'>
                                Login
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container justify='center' className='sign-in' spacing={24}>
                        <Grid item xs={10}>
                            <form className='sign-in_form'>
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
                            <Divider/>
                            <Grid item className='sign-in_footer' xs={12}>
                                <Button>
                                    Lost your pasport?
                                </Button>
                                <Button>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    }
}