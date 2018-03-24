import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Grid from 'material-ui/Grid';
import '../styles/components/header.scss';

export default function Header() {
    return (
        <Grid container spacing={8}>
            <Grid item xs={12}>
                <AppBar className='header' position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            Your chat
                        </Typography>
                        <Button color="inherit" className='header__right'>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
    );
  }