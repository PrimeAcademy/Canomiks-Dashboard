import { combineReducers } from 'redux';
import moment from 'moment';

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

// state for current sample
const emptySampleObj = {
  id: '',
  ingredientName: '',
  lotNumber: '',
  format: '',
  ingredientAmount: '',
  ingredientUnit: '',
  purity: '',
  dateManufactured: moment.utc(new Date()).format("YYYY-MM-DD"),
  extractionMethod: '',
  city: '',
  state: '',
  country: '',
  harvestDate: moment.utc(new Date()).format("YYYY-MM-DD"),
  sustainabilityInfo: '',
  cropStrain: '',
  shippedDate: moment.utc(new Date()).format("YYYY-MM-DD"),
  carrierName: '',
  trackingNumber: '',
  receivedDate: '',
  delayed: false,
  testingStatus: 1
};

// start the current sample with empty information
const currentSample = (state = emptySampleObj, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SAMPLE':
      return action.payload;
    case 'SET_INIT_SAMPLE_ID':
      return {
        ...state,
        id: action.payload.id
      }
    case 'CLEAR_CURRENT_SAMPLE':
      return emptySampleObj;

    case 'UPDATE_CURRENT_SAMPLE':
      let inputName = action.payload.currentInputName;
      return {
        ...state,
        [inputName]: action.payload.newValue
      };

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
