import { combineReducers } from 'redux';

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ORDERS':
      return action.payload;
    case 'SET_ALL_ORDERS':
      return action.payload;
    default:
      return state;
  }
};

const currentSample = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SAMPLE':
      return action.payload;
    case 'CLEAR_CURRENT_SAMPLE':
      console.log('sample cleared');
      return {};
    // For lab only
    case 'EDIT_SAMPLE_STATUS':
      return {
        ...state,
        sequence: action.payload.step,
        testState: action.payload.state,
      };
    case 'EDIT_SAMPLE_DELAY':
      return {
        ...state,
        delayed: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  orderReducer,
  currentSample,
});
