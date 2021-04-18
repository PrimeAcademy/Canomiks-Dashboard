const shippingReducer = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_SHIPPING':
      return action.payload;
    case 'CLEAR_SHIPPING':
      return [];
    default:
      return state;
  }
};

export default shippingReducer;
