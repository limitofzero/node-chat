import * as React from 'react';
import '../../styles/components/sign-in.scss';
import { Divider, Grid, Toolbar, Paper, AppBar, Typography, Button } from 'material-ui';
import SignInForm from './SignInForm';
import Header from '../Header';
import SignInFooter from './SignInFooter';

export default class SingInPage extends React.Component<{}> {
    render() {
        return <Grid container justify='center' spacing={24}>
            <Grid item direction='column' sm={8} xs={11} md={6} lg={4}>
                <Paper>
                    <Header title='Login'/>
                    <Grid container justify='center' className='sign-in' spacing={24}>
                        <Grid item xs={10}>
                            <SignInForm/>
                            <Divider/>
                            <SignInFooter/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    }
}