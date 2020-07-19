import {Grid, AppBar, Tabs, Tab, TextField, createStyles, Theme} from '@material-ui/core';
import React, { useState } from 'react';
import {makeStyles} from "@material-ui/core/styles";

type AuthForms = 'sign-in' | 'sign-up';

export const AuthForm = () => {
  const [form, setForm] = useState<AuthForms>('sign-in');

  const handleTabChange = (event, newValue) => {
    setForm(newValue);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          display: 'flex',
          flexDirection: 'column',
          margin: theme.spacing(3)
        },
      },
    }),
  );

  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <Grid item>
        <AppBar position='static'>
          <Tabs value={form} onChange={handleTabChange}>
            <Tab label='Sign In' value='sign-in'/>
            <Tab label='Sign up' value='sign-up'/>
          </Tabs>
          <div hidden={form === 'sign-up'}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="email" label="Login"/>
              <TextField id="password" type="password" label="Password"/>
            </form>
          </div>
          <div hidden={form === 'sign-in'}> This will be sign up form!</div>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default AuthForm;
