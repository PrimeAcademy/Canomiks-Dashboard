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
} // end fetchAllOrders

function* addSampleOrder(action) {
  try {
    const response = yield axios.post('/api/orders/start', action.payload);

    yield put({
      type: 'SET_INIT_SAMPLE_ID',
      payload: response.data,
    });
  } catch (err) {
    console.error('Error in addSampleOrder', err.message);
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

function* updateSampleLab(action) {
  try {
    const response = yield axios.put(
      '/api/orders/lab/update',
      action.payload.sample
    );

    const customerSampleInfo = action.payload.sample;

    // Checks if theres a pdf and if the customer wants to be notified
    if (customerSampleInfo.pdfUrl && customerSampleInfo.alertResultsReady) {
      // result email triggered
      yield put({
        type: 'EMAIL_STATUS',
        payload: {
          strain: response.data.cropStrain,
          pdf: response.data.pdfUrl,
          ingredient: response.data.ingredientName,
          orderId: response.data.id,
          companyID: response.data.companyID,
          message:
            'Good News! We have finished testing your sample. Please log in to view your results. For any questions please feel free to reach out to us. Thank You. ',
        },
      });
    }

    // Checks if delayed status has been changed and if the customer wants to be notified
    else if (response.data.delayed && customerSampleInfo.alertDelay) {
      // delayed status email triggered
      yield put({
        type: 'EMAIL_STATUS',
        payload: {
          strain: customerSampleInfo.cropStrain,
          pdf: customerSampleInfo.pdfUrl,
          ingredient: customerSampleInfo.ingredientName,
          orderId: response.data.id,
          companyID: response.data.companyID,
          message:
            'Unfortunately, there was an issue with your sample and it has been delayed. We will be in contact with you shortly with more information. ',
        },
      });
    }

    // Checks if test state has been changed and if the customer wants to be notified
    if (
      (action.payload.sequence !== customerSampleInfo.sequence ||
        action.payload.testState !== customerSampleInfo.testState) &&
      customerSampleInfo.alertStatusChange
    ) {
      // status change email triggered
      yield put({
        type: 'EMAIL_STATUS',
        payload: {
          strain: customerSampleInfo.cropStrain,
          ingredient: customerSampleInfo.ingredientName,
          orderId: customerSampleInfo.id,
          companyID: customerSampleInfo.companyID,
          message:
            'Your sample has moved to the next stage of the testing process. ',
        },
      });
    }

    yield put({
      type: 'FETCH_ALL_ORDERS',
    });
  } catch (err) {
    console.error('Error in updateSampleLab', err.message);
  }
} // end updateSampleLab

function* deleteCurrentSample(action) {
  try {
    yield axios.delete(
      `/api/orders/delete/${action.payload.companyID}/${action.payload.orderId}`
    );
    yield put({
      type: 'CLEAR_CURRENT_SAMPLE',
    });
  } catch (err) {
    console.error('Error in deleteCurrentSample', err.message);
  }
} // end deleteCurrentSample

function* updateTestPhase(action) {
  try {
    const response = yield axios.put('/api/orders/date', action.payload);
    yield put({
      type: 'SET_CURRENT_SAMPLE',
      payload: response.data,
    });
  } catch (err) {
    console.error('Error in updateTestPhase', err.message);
  }
}

function* searchDelayedOrders(action) {
  try {
    const response = yield axios.get(
      `/api/orders/delayed/${action.payload.value}`
    );
    yield put({
      type: 'SET_ALL_ORDERS',
      payload: response.data,
    });
  } catch (err) {
    console.error('Error in searchDelayedOrders', err.message);
  }
}

function* orderSaga() {
  yield takeLatest('FETCH_CUSTOMER_ORDERS', fetchCustomerOrders);
  yield takeLatest('FETCH_ALL_ORDERS', fetchAllOrders);
  yield takeLatest('ADD_SAMPLE', addSampleOrder);
  yield takeLatest('UPDATE_SAMPLE_INFO', updateSampleInfo);
  yield takeLatest('UPDATE_SHIPPING_INFO', updateShipping);
  yield takeLatest('UPDATE_SAMPLE_LAB', updateSampleLab);
  yield takeLatest('UPDATE_TEST_PHASE', updateTestPhase);
  yield takeLatest('DELETE_CURRENT_SAMPLE', deleteCurrentSample);
  yield takeLatest('SEARCH_DELAYED_ORDERS', searchDelayedOrders);
}

export default orderSaga;
