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
}

export default orderSaga;