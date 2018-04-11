import * as React from 'react';
import '../../styles/components/sign-in.scss';
import { Divider, Grid, Toolbar, Paper, AppBar, Typography, Button } from 'material-ui';
import SignInForm from './SignInForm';

export default class SingInPage extends React.Component<{}> {
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
                            <SignInForm/>
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