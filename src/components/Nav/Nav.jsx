import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddSample from '../AddSample/AddSample';

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
            <Link className="navLink" to="/samples">
              Samples
            </Link>
            
          </>
        )}

        {user.authLevel === 'admin' && (
          <Link className="navLink" to="/manage">
            Manage Customers
          </Link>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>

        {user.id && <LogOutButton className="navLink" />}
      </div>
    </div>
  );
}

export default Nav;
