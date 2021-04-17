import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* sendEmail (action) {
 try {
  const response = yield axios.post('/api/email', action.payload);  
 }
 catch (err) {
   console.log('💥 error in the sendEmail', err);
 }
}; // end sendEmail

function* emailSaga () {
  yield takeLatest('SEND_EMAIL', sendEmail);
};

export default emailSaga;