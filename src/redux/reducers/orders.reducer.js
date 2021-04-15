import { combineReducers } from 'redux';


const orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ORDERS':
      return action.payload;
    default:
      return state;
  }
};

const currentSample = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_SAMPLE':
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  orderReducer,
  currentSample
});

// export default orderReducer;