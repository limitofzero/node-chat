import React, { useEffect, useState } from 'react';
import { Message } from '@messenger/api-interfaces';
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
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
  );
};

export default App;
