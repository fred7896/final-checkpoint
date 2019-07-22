const SET_CART = "SET_CART";

const setCartAction = newCart => ({
  type: SET_CART,
  newCart
});

module.exports = {
  SET_CART,
  setCartAction
};
