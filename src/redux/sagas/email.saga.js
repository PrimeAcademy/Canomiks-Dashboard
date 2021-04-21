import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* sendEmail(action) {
  try {
    const response = yield axios.post('/api/email', action.payload);
  } catch (err) {
    console.log('Error in sendEmail', err);
  }
} // end sendEmail

function* emailDelayedStatus (action) {
  try {
    console.log('🦁 emailDelayedStatus', action.payload);
    // send a dispatch that returns the email of the user that is connected with the order
    const ownerResponse = yield axios.post('/api/user/sampleOwner', action.payload);

    console.log('🐣 should have the info now:', ownerResponse.data);

    const newPayload =  {...action.payload, ...ownerResponse.data}
    // send to server that sends email to correct person
    const emailResponse = yield axios.post('/api/email/', newPayload);
  }
  catch (err) {
    console.log('💥 error in the emailDelayedStatus', err);
  }
}; // end emailDelayedStatus

function* emailSaga() {
  yield takeLatest('SEND_EMAIL', sendEmail);
  yield takeLatest('EMAIL_DELAYED_STATUS', emailDelayedStatus);
}

export default emailSaga;
