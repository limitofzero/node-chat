import * as React from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton, Grid} from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import Props from '../interfaces/Header';
import '../styles/components/header.scss';

export default function Header(props: Props) {
    const {title, withLogout, withMenu} = props;

    const menu = withMenu ? (
    <IconButton color="inherit" aria-label="Menu"><MenuIcon/></IconButton>
    ) : null;
    
    const logoutBtn = withLogout ? (
        <Button color="inherit" className='header__right'>Logout</Button>
    ) : null;

    return (
        <Grid container spacing={8}>
            <Grid item xs={12}>
                <AppBar className='header' position="static">
                    <Toolbar>
                        {menu}
                        <Typography variant="title" color="inherit">
                            {title}
                        </Typography>
                        {logoutBtn}
                    </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
    );
  }