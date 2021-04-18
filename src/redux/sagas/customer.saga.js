import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCustomers() {
  try {
    const response = yield axios.get('/api/companies');
    yield put({
      type: 'SET_CUSTOMER',
      payload: response.data,
    });
  } catch (err) {
    console.error(err.message);
  }
} // end fetchCustomers

function* customerSaga() {
  yield takeLatest('FETCH_CUSTOMERS', fetchCustomers);
}

export default customerSaga;
