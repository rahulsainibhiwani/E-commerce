import { httpGet, httpPost } from "../../config/axiosConfig";
import {
  MY_ORDER_DETAILS_FAIL,
  MY_ORDER_DETAILS_REQUEST,
  MY_ORDER_DETAILS_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const { data } = await httpPost.post("/order", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { data } = await httpGet.get(`/order/orderDetail/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    const {
      LoginUser: { userInfo },
    } = getState();
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });
      const { data } = await httpPost.put(
        `/order/pay/${orderId}`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyOrder = () => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: MY_ORDER_DETAILS_REQUEST,
    });
    const { data } = await httpGet(`/order/myorders`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: MY_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
