import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// local components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import AddSample from '../AddSample/AddSample';
import Summary from '../Summary/Summary';
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard';
import LabDashboard from '../LabDashboard/LabDashboard';
import ManageCustomers from '../ManageCustomers/ManageCustomers';
import ShippingInfo from '../ShippingInfo/ShippingInfo';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ResetPassword from '../ResetPassword/ResetPassword';

import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';

import './App.css';

function App() {
  const dispatch = useDispatch();

  /* Store Imports */
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#1e565c',
      },
    },
    typography: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      h1: {
        fontFamily: 'Roboto',
        fontSize: '3.8em',
        fontWeight: 400,
        letterSpacing: '.05em',
      },
    },
    overrides: {
      MuiSwitch: {
        switchBase: {
          // Controls default (unchecked) color for the thumb
          color: '#efefef',
        },
        colorSecondary: {
          '&$checked': {
            // Controls checked color for the thumb
            color: '#1e565c',
          },
        },
        track: {
          // Controls default (unchecked) color for the track
          opacity: 0.2,
          backgroundColor: '#1e565c',
          '$checked$checked + &': {
            // Controls checked color for the track
            opacity: 0.5,
            backgroundColor: '#1e565c',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/login" />

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

          <ProtectedRoute exact path="/shipping">
            <ShippingInfo />
          </ProtectedRoute>

          <ProtectedRoute exact path="/summary">
            <Summary />
          </ProtectedRoute>

          <ProtectedRoute exact path="/forgotPassword" authRedirect="/samples">
            <ForgotPassword />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/resetPassword/:token/:id"
            authRedirect="/samples"
          >
            <ResetPassword />
          </ProtectedRoute>

          {/* <Route exact path="/forgotPassword">
            <ForgotPassword />
          </Route> */}
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
