import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';

import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

import './Nav.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    maxWidth: 160,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  navBar: {
    letterSpacing: '.11em',
    textTransform: 'uppercase',
  },
  offset: theme.mixins.toolbar,
}));

function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();

  /* Store Import */
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/samples';
    loginLinkData.text = 'Samples';
  }

  return (
    <AppBar
      className={classes.navBar}
      position="static"
      style={{ marginBottom: 30 }}
    >
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#1e565c',
          height: '112px',
        }}
      >
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to={user.id ? '/samples' : '/login'}
        >
          <div className="img">
            <img src="../logo.png" alt="logo" />
          </div>
        </Link>

        <div>
          <NavLink
            activeClassName="activeLink"
            className="navLink"
            to={loginLinkData.path}
          >
            {loginLinkData.text}
          </NavLink>

          {user.authLevel === 'admin' && (
            <NavLink
              activeClassName="activeLink"
              className="navLink"
              to="/manage/customers"
            >
              Manage Customers
            </NavLink>
          )}

          {(user.authLevel === 'team' || !user.id) && (
            <>
              <a className="navLink" href="https://www.canomiks.com/contactus">
                Help
              </a>

              <a className="navLink" href="https://www.canomiks.com/about-us">
                About Us
              </a>
            </>
          )}

          {user.id && <LogOutButton className="navLink" />}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
