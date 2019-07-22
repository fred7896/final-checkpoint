import { SET_CART } from "../actions/cartActions";

let initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return (state = action.newCart);
    default:
      return state;
  }
};

export default cartReducer;
