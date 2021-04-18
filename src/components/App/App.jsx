import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* Local Components */
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
import ManageCustomers from '../ManageCustomers/Manage';
import ShippingInfo from '../ShippingInfo/ShippingInfo';

import './App.css';
import { CssBaseline } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <Router>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <ProtectedRoute exact path="/home" authRedirect="/samples">
            <LandingPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/login" authRedirect="/samples">
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/registration" authRedirect="/samples">
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/samples">
            {user.authLevel === 'lab' || user.authLevel === 'admin' ? (
              <LabDashboard />
            ) : (
              <CustomerDashboard />
            )}
          </ProtectedRoute>

          <ProtectedRoute path="/summary">
            <Summary />
          </ProtectedRoute>

          <ProtectedRoute exact path="/sample/add">
            <AddSample />
          </ProtectedRoute>

          <ProtectedRoute exact path="/sample/ship">
            <ShippingInfo />
          </ProtectedRoute>

          {user.authLevel === 'admin' && (
            <ProtectedRoute exact path="/manage/customers">
              <ManageCustomers />
            </ProtectedRoute>
          )}
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
