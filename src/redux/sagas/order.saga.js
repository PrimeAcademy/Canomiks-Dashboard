import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCustomerOrders() {
  try {
    const response = yield axios.get('/api/orders');
    yield put({
      type: 'SET_CUSTOMER_ORDERS',
      payload: response.data,
    });
<<<<<<< HEAD
  } catch (err) {
    console.error(err.message);
  }
}

function* addShipping(action) {
  try {
    const response = yield axios.post('/api/orders/shipping', action.payload);
=======
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877
  } catch (err) {
    console.error('Error in fetchCustomerOrders', err.message);
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
    console.error('Error in fetchAllOrders', err.message);
  }
<<<<<<< HEAD
} // end addShipping
=======
} // end fetchAllOrders
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877

function* addSampleOrder(action) {
  try {
<<<<<<< HEAD
    const response = yield axios.post(
      '/api/orders/initialSample',
      action.payload
    );
=======
    const response = yield axios.post('/api/orders/start', action.payload);
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877

    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data,
    });
  } catch (err) {
<<<<<<< HEAD
    console.log('💥 error in initial sample order', err);
  }
} // end initialSampleOrder
=======
    console.error('Error in addSampleOrder', err.message);
  }
} // end addSampleOrder
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877

function* updateSampleInfo(action) {
  try {
    const response = yield axios.put('/api/orders/update', action.payload);

    // now set current sample with all the info
    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data,
    });
  } catch (err) {
<<<<<<< HEAD
    console.log('💥 error in the addSampleInfo', err);
  }
} // end addSampleInfo

function* deleteCurrentSample(action) {
  try {
    const response = yield axios.delete(
      `/api/orders/deleteSample/${action.payload.companyID}/${action.payload.orderId}`
    );
  } catch (err) {
    console.log('💥 error in the addSampleInfo', err);
=======
    console.error('Error in updateSampleInfo', err.message);
  }
} // end updateSampleInfo

function* updateShipping(action) {
  try {
    const response = yield axios.put('/api/orders/shipping', action.payload);
  } catch (err) {
    console.error('Error in updateShipping', err.message);
  }
} // end updateShipping

function* deleteCurrentSample(action) {
  try {
    const response = yield axios.delete(
      `/api/orders/delete/${action.payload.companyID}/${action.payload.orderId}`
    );
  } catch (err) {
    console.error('Error in deleteCurrentSample', err.message);
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877
  }
} // end deleteCurrentSample

function* orderSaga() {
<<<<<<< HEAD
  yield takeLatest('ADD_SHIPPING_INFO', addShipping);
  yield takeLatest('ADD_SAMPLE_INFO', addSampleInfo);
  yield takeLatest('INITIAL_SAMPLE_ORDER', initialSampleOrder);
=======
>>>>>>> 356e35d2d96fe3e65fb8ecddc629f2ded9701877
  yield takeLatest('FETCH_CUSTOMER_ORDERS', fetchCustomerOrders);
  yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrders);
  yield takeLatest('ADD_SAMPLE', addSampleOrder);
  yield takeLatest('UPDATE_SAMPLE_INFO', updateSampleInfo);
  yield takeLatest('UPDATE_SHIPPING_INFO', updateShipping);
  yield takeLatest('DELETE_CURRENT_SAMPLE', deleteCurrentSample);
}

export default orderSaga;
