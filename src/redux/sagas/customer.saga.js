import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
function* fetchCustomer() {
    try {
      const response = yield axios.get('/api/orders/companies');
      yield put({
        type: 'SET_CUSTOMER',
        payload: response.data
        
      })
    } catch (err) {
      console.error(err.message);
    }
  }
  function* customerSaga() {
    yield takeLatest('FETCH_CUSTOMERS', fetchCustomer);
    
  }
  
  export default customerSaga;