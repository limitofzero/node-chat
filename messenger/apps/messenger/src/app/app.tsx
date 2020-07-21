import React, { useEffect, useState } from 'react';
import { Message } from '@messenger/api-interfaces';
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AuthForm from './auth/auth-form';
import CssBaseline from "@material-ui/core/CssBaseline";

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CssBaseline/>
          <Grid>
            <AppBar position='static'>
              <Toolbar>
                <Typography variant="h6">
                  React messenger
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={{ textAlign: 'center' }}>
              <img
                width="450"
                src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
              />
            </div>
            <div>{m.message}</div>
          </Grid>
        </Route>
        <Route path="/auth">
          <CssBaseline/>
          <AuthForm/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
