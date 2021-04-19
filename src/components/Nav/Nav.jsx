import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
// import Logo from '../Logo/Logo';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  right: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  offset: theme.mixins.toolbar,
}));

function Nav() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/samples';
    loginLinkData.text = 'Home';
  }

  return (
    <div>
      {/* <Logo /> 
       In case we decide to use as a component*/}
      <AppBar position="static" style={{ marginBottom: 50 }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: '#1e565c' }}>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/samples">
            <div className="header-brand-logo">
              <img src="../favicon.ico" alt="logo"></img>
              <Typography className={classes.title}>
                Canomiks
              </Typography>
            </div>
          </Link>

          <div>
            <Link className="navLink" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>

            {user.id && (
              <Link className="navLink" to="/samples">
                Samples
              </Link>
            )}

            {user.authLevel === 'admin' && (
              <Link className="navLink" to="/manage">
                Manage Customers
              </Link>
            )}

            {/* https://www.canomiks.com/contactus */}
            <a className="navLink" target="_blank" href="https://www.canomiks.com/contactus">
              Help
            </a>
            {/* https://www.canomiks.com/about-us */}
            <a className="navLink" target="_blank" href="https://www.canomiks.com/about-us">
              About Us
            </a>
            {user.id && <LogOutButton className="navLink" />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
