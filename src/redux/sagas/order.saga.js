import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCustomerOrders() {
  try {
    const response = yield axios.get('/api/orders');
    yield put({
      type: 'SET_CUSTOMER_ORDERS',
      payload: response.data,
    });
  } catch (err) {
    console.error(err.message);
  }
} // end fetchCustomerOrders

function* fetchAllOrders() {
  try {
    const response = yield axios.get('/api/orders/all');
    yield put({
      type: 'SET_ALL_ORDERS',
      payload: response.data,
    });
  } catch (err) {
    console.error(err.message);
  }
} // end fetchAllOrders

function* addSampleOrder(action) {
  try {
    const response = yield axios.post('/api/orders/start', action.payload);

    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data,
    });
  } catch (err) {
    console.log('💥 error in initial sample order', err);
  }
} // end addSampleOrder

function* updateSampleInfo(action) {
  try {
    const response = yield axios.put('/api/orders/update', action.payload);

    // now set current sample with all the info
    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data,
    });
  } catch (err) {
    console.log('💥 error in the addSampleInfo', err);
  }
} // end updateSampleInfo

function* updateShipping(action) {
  try {
    const response = yield axios.post('/api/orders/shipping', action.payload);
  } catch (err) {
    console.error(err.message);
  }
} // end updateShipping

function* deleteCurrentSample(action) {
  try {
    const response = yield axios.delete(
      `/api/orders/delete/${action.payload.companyID}/${action.payload.orderId}`
    );
  } catch (err) {
    console.log('💥 error in the addSampleInfo', err);
  }
} // end deleteCurrentSample

function* orderSaga() {
  yield takeLatest('FETCH_CUSTOMER_ORDERS', fetchCustomerOrders);
  yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrders);
  yield takeLatest('ADD_SAMPLE', addSampleOrder);
  yield takeLatest('UPDATE_SAMPLE_INFO', updateSampleInfo);
  yield takeLatest('UPDATE_SHIPPING_INFO', updateShipping);
  yield takeLatest('DELETE_CURRENT_SAMPLE', deleteCurrentSample);
}

export default orderSaga;
