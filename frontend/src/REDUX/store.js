import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productListReducer";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import {
  authReducer,
  userDetailsReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/authReducer";
import { cartSaveShippingAddress } from "./actions/cartActions";

const Middleware = [thunk];

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  LoginUser: authReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailsReducer,
  updatedUser: userUpdateProfileReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  LoginUser: {
    userInfo: userInfoFromStorage,
  },
  PaymentMethod: paymentMethodFromStorage,
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
