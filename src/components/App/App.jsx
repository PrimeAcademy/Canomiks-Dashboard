import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddSample from '../AddSample/AddSample';
import Summary from '../Summary/Summary';

import CustomerDashboard from '../CustomerDashboard/CustomerDashboard';
import LabDashboard from '../LabDashboard/LabDashboard';
import Manage from '../ManageCustomers/Manage';
import ShippingInfo from '../ShippingInfo/ShippingInfo';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <ProtectedRoute exact path="/home" authRedirect="/samples">
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/samples">
            {user.authLevel === 'lab' || user.authLevel === 'admin' ? (
              <LabDashboard />
            ) : (
              <CustomerDashboard />
            )}
          </ProtectedRoute>

          <ProtectedRoute exact path="/login" authRedirect="/samples">
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/addSample">
            <AddSample />
          </ProtectedRoute>

          <ProtectedRoute exact path="/registration" authRedirect="/samples">
            <RegisterPage />
          </ProtectedRoute>

          {user.authLevel === 'admin' && (
            <ProtectedRoute exact path="/manage">
              <Manage />
            </ProtectedRoute>
          )}
          <ProtectedRoute exact path="/shipping">
            <ShippingInfo />
          </ProtectedRoute>

          <Route path="/summary">
            <Summary />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
