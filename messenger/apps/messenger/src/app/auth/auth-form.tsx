import { Grid, Paper, AppBar, Tabs, Tab } from '@material-ui/core';
import React from 'react';

export const AuthForm = () => {
  return (
    <Grid container justify='center'>
      <Grid item>
        <AppBar position='static'>
          <Tabs>
            <Tab label='Sign In'></Tab>
            <Tab label='Sign up'></Tab>
          </Tabs>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default AuthForm;