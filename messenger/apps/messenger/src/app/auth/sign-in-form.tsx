import {createStyles, TextField, Theme} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


export const SignInForm = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiTextField-root': {
          display: 'flex',
          flexDirection: 'column',
          margin: theme.spacing(3),
        },
      },
    }),
  );

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="email" label="Login"/>
      <TextField id="password" type="password" label="Password"/>
    </form>
  );
}
