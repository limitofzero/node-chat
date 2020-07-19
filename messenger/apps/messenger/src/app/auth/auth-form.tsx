import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import React, { useState } from 'react';

type AuthForms = 'sign-in' | 'sign-up';

export const AuthForm = () => {
  const [form, setForm] = useState<AuthForms>('sign-in');

  const handleTabChange = (event, newValue) => {
    setForm(newValue);
  };

  return (
    <Grid container justify='center'>
      <Grid item>
        <AppBar position='static'>
          <Tabs value={form} onChange={handleTabChange}>
            <Tab label='Sign In' value='sign-in'/>
            <Tab label='Sign up' value='sign-up'/>
          </Tabs>
          <div hidden={form === 'sign-up'}> This will be sign in form!</div>
          <div hidden={form === 'sign-in'}> This will be sign up form!</div>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default AuthForm;
