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

function* addShipping(action) {
  console.log("action payload,", action.payload)
  try {
    const response = yield axios.put('/api/orders/shipping', action.payload);
  } catch (err) {
    console.error(err.message);
  }
}; // end addShipping

function* initialSampleOrder (action) {
  console.log('initial sample order, payload: ', action.payload);
  try{
    const response = yield axios.post('/api/orders/initialSample', action.payload);
    console.log(response);
    
  }
  catch(err) {
    console.log('💥 error in initial sample order', err);
  }
}; // end initialSampleOrder

function* addSampleInfo (action) {
  console.log('add sample info, payload:', action.payload);
  try {
    yield axios.put('/api/orders/newOrder', action.payload);

  }
  catch (err) {
    console.log('💥 error in the addSampleInfo', err);
  }
}; // end addSampleInfo

function* orderSaga() {
  yield takeLatest('FETCH_CUSTOMER_ORDERS', fetchCustomerOrders);
  yield takeLatest('ADD_SHIPPING_INFO', addShipping);
  yield takeLatest('ADD_SAMPLE_INFO', addSampleInfo);
  yield takeLatest('INITIAL_SAMPLE_ORDER', initialSampleOrder )
}; 

export default orderSaga;