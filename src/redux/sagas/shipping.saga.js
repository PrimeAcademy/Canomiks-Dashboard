import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addShippingInfo(action) {
  try {
    const response = yield axios.put('/api/orders/shipping', action.payload);

    yield put({
      type: 'EDIT_SHIPPING',
      payload: response.data
    });

  } catch (err) {
    console.log('💥 error in shipping', err);
  }
}
function* ShippingSaga() {
  yield takeLatest('ADD_SHIPPING_INFO', addShippingInfo)
}

export default ShippingSaga;
