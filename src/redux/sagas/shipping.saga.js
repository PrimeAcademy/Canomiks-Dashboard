import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* editShipping(action) {
    console.log('in edit shipping', action);
    yield axios.put('/api/orders//newOrders/:id', action.payload);
    // fetch latest data from server
    try {
      yield put({
        type: 'EDIT_SHIPPING',
      });
    } catch (err) {
      console.log('error in shipping', err);
    }
  }
function* ShippingSaga() {
    yield takeLatest('SET_SHIPPING', editShipping)
   
  }
export default ShippingSaga;
