import { Link } from 'react-router-dom';
import React from 'react';
import './Logo.css';


function Logo() {

  return(<>
        <Link to="/home">
          <div className="header-brand-logo">
            <img  src="../favicon.ico" alt="logo"></img>
            <p className="nav-title">
              Canomiks
              </p>
              <p className="header-foods">
                Genomics for functional foods 
            </p>
          </div>
        </Link>
  </>)
  
}

export default Logo;