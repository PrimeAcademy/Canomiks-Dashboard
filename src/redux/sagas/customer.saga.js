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
    console.error('Error in fetchCustomers', err.message);
  }
} // end fetchCustomers

function* toggleCompanyActiveStatus(action) {
  console.log('action', action)
  try {
    yield axios.put('/api/companies', action.payload);
    yield put({
      type: 'FETCH_CUSTOMERS'
    });
  } catch (err) {
    console.err(err.message);
  }
}

function* customerSaga() {
  yield takeLatest('FETCH_CUSTOMERS', fetchCustomers);
  yield takeLatest('TOGGLE_COMPANY_ACTIVE_STATUS', toggleCompanyActiveStatus);
}

export default customerSaga;
