import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    // clear any existing error on the login page
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the user
    const response = yield axios.post(
      '/api/user/login',
      action.payload,
      config
    );
    if (response.data) {
      yield put({ type: 'FETCH_USER' });
    } else {
      yield put({ type: 'LOGIN_FAILED_INACTIVE' });
      yield put({ type: 'LOGOUT' });
    }
    // after the user has logged in
    // get the user information from the server
  } catch (error) {
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if user isn't in the database or
      // if the username and password don't match in the database
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/user/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' });
  } catch (err) {
    console.error('Error with user logout:', err.message);
  }
}

function* forgotPassword(action) {
  try {
    yield axios.post('/api/email/forgotPassword', action.payload);
  } catch (err) {
    console.error('Something went wrong in the forgot password', err.message);
  }
}

function* checkPasswordToken(action) {
  try {
    yield axios.post('/api/email/resetPassword', action.payload);
  } catch (err) {
    console.error('Error in the checkPasswordToken', err.message);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
  yield takeLatest('FORGOT_PASSWORD', forgotPassword);
  yield takeLatest('CHECK_FORGOT_PASSWORD_TOKEN', checkPasswordToken);
}

export default loginSaga;
