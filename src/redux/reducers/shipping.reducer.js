const shippingReducer = (state = [], action) => {
    switch (action.type) {
      case 'EDIT_SHIPPING':
        return action.payload;
      case 'UNSET_SHIPPING':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default shippingReducer;
  