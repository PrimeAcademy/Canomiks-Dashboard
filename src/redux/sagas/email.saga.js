import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* sendEmail(action) {
  try {
    const response = yield axios.post('/api/email', action.payload);
  } catch (err) {
    console.log('Error in sendEmail', err);
  }
} // end sendEmail

function* emailStatus (action) {
  try {
    console.log('🦺 updateSampleStatus', action.payload);

    // send a dispatch that returns the email of the user that is connected with the order
    const ownerResponse = yield axios.post('/api/user/sampleOwner', action.payload);

    const newPayload =  {...action.payload, ...ownerResponse.data};

    console.log('🎒 new payload:', newPayload);
    // send to server that sends email to correct person
    const emailResponse = yield axios.post('/api/email/', newPayload);

    console.log('🐬  emailResponse:', emailResponse);
  }
  catch (err) {
    console.log('💥 error in the emailStatus', err);
  }
}; // end emailStatus



function* emailSaga() {
  yield takeLatest('SEND_EMAIL', sendEmail);
  yield takeLatest('EMAIL_STATUS', emailStatus);
}

export default emailSaga;
