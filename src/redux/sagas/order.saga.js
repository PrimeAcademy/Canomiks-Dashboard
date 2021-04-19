import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCustomerOrders() {
  try {
    const response = yield axios.get('/api/orders');
    yield put({
      type: 'SET_CUSTOMER_ORDERS',
      payload: response.data
    })
  } catch (err) {
    console.error(err.message);
  }
}
function* updateUrl(action) {
  try {
    const response = yield axios.put('/api/orders/url', action.payload);
  } catch (err) {
    console.error('Error in updateUrl', err.message);
  }
} // end updateShipping
function* addOrder(action) {
  console.log("action payload,", action.payload)
  try{
    const response = yield axios.post('/api/orders/shipping', action.payload);
  } catch(err) {
    console.error(err.message);
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_CUSTOMER_ORDERS', fetchCustomerOrders);
  yield takeLatest('ADD_ORDER', addOrder);
  yield takeLatest('ADD_URL', updateUrl);
}

export default orderSaga;