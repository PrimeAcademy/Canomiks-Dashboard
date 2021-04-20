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

    // For lab only
    case 'EDIT_SAMPLE_STATUS':
      return {
        ...state,
        sequence: action.payload.step,
        testState: action.payload.state,
      };
    default:
      return state;
  }
};

export default combineReducers({
  orderReducer,
  currentSample,
});
