import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* sendEmail(action) {
  try {
    const response = yield axios.post('/api/email', action.payload);
  } catch (err) {
    console.error('Error in sendEmail', err.message);
  }
} // end sendEmail

function* emailStatus(action) {
  try {
    // send a dispatch that returns the email of the user that is connected with the order
    const ownerResponse = yield axios.post(
      '/api/user/sampleOwner',
      action.payload
    );

    const newPayload = { ...action.payload, ...ownerResponse.data };

    // send to server that sends email to correct person
    yield axios.post('/api/email/', newPayload);
  } catch (err) {
    console.error('Error in the emailStatus', err.message);
  }
} // end emailStatus

function* emailSaga() {
  yield takeLatest('SEND_EMAIL', sendEmail);
  yield takeLatest('EMAIL_STATUS', emailStatus);
}

export default emailSaga;
