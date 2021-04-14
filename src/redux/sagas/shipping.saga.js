import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addShipping(action) {
    console.log('in add fav', action);
    yield axios.put('/:id', action.payload);
    // fetch latest data from server
    try {
      yield put({
        type: 'ADD_SHIPPING',
      });
    } catch (err) {
      console.log('error in shipping', err);
    }
  }
function* ShippingSaga() {
    yield takeLatest('SET_SHIPPING', addShipping)
   
  }
export default ShippingSaga;
