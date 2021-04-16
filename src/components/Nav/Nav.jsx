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
    loginLinkData.path = '/samples';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/samples">
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

        {user.id && <LogOutButton className="navLink" />}
        {/* https://www.canomiks.com/contactus */}
        <Link className="navLink" to="/contactus">
          Help
        </Link>
        {/* https://www.canomiks.com/about-us */}
        <Link className="navLink" to="/about-us">
          About Us
        </Link>
      </div>
    </div>
  );
}

export default Nav;
