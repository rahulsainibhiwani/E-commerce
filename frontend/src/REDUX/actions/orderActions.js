import { httpGet, httpPost } from "../../config/axiosConfig";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
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
