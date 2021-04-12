import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  if ((user.authLevel = 'lab')) {
    loginLinkData.path = '/lab';
    loginLinkData.text = 'Home';
  }

  if ((user.authLevel = 'admin')) {
    loginLinkData.path = '/admin';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Canomiks</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <Link className="navLink" to="/samples">
              Samples
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {user.authLevel === 'lab' && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <Link className="navLink" to="/samples">
              Samples
            </Link>
            {/* <Link className="navLink" to="/manage">
              Manage Customers
            </Link> */}
            <LogOutButton className="navLink" />
          </>
        )}

        {user.authLevel === 'admin' && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <Link className="navLink" to="/samples">
              Samples
            </Link>
            <Link className="navLink" to="/manage">
              Manage Customers
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        {/* if auth level = admin render this option
        views/links will depend on what's auth level */}
      </div>
    </div>
  );
}

export default Nav;
