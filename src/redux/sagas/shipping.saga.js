import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addShippingInfo(action) {
  console.log('🎸 in edit shipping', action.payload);
  try {
    const response = yield axios.put('/api/orders/shipping', action.payload);
    console.log('🎻 response is:', response.data);

    // yield put({
    //   type: 'EDIT_SHIPPING',
    // });

  } catch (err) {
    console.log('💥 error in shipping', err);
  }
}
function* ShippingSaga() {
  yield takeLatest('ADD_SHIPPING_INFO', addShippingInfo)
}

export default ShippingSaga;
