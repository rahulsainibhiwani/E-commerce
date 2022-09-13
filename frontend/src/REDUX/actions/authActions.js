import { httpGet, httpPost } from "../../config/axiosConfig";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  GET_USER_BY_ADMIN_REQUEST,
  GET_USER_BY_ADMIN_SUCCESS,
  GET_USER_BY_ADMIN_FAIL,
  UPDATE_USER_BY_ADMIN_REQUEST,
  UPDATE_USER_BY_ADMIN_SUCCESS,
  UPDATE_USER_BY_ADMIN_FAIL,
} from "../constants/authConstants";

export const userLOGIN = (Data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await httpPost.post("/user/login", Data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  document.location.href = "/signIn";
};

export const userRegist = (Data) => async (dispatch) => {
  const { name, email, password } = Data;
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await httpPost.post("/user/createUser", {
      name,
      email,
      password,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userDetailAction = (id) => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const { data } = await httpGet(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfileAction = (user) => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });
    const { data } = await httpGet.put(`/user/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userListAction = () => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const { data } = await httpGet(`/user/getUsers`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDeleteAction = (id) => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const { data } = await httpGet.delete(`/user/deleteUser/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserByAdminAction = (id) => async (dispatch, getState) => {
  const {
    LoginUser: { userInfo },
  } = getState();
  try {
    dispatch({
      type: GET_USER_BY_ADMIN_REQUEST,
    });
    const { data } = await httpGet(`/user/admin/getAUser/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: GET_USER_BY_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserByAdminAction =
  (id, userData) => async (dispatch, getState) => {
    const {
      LoginUser: { userInfo },
    } = getState();
    console.log(userData);
    try {
      dispatch({
        type: UPDATE_USER_BY_ADMIN_REQUEST,
      });
      const { data } = await httpPost.put(
        `/user/admin/updateAUser/${id}`,
        userData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: UPDATE_USER_BY_ADMIN_SUCCESS,
      });
      dispatch({
        type: GET_USER_BY_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_BY_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
