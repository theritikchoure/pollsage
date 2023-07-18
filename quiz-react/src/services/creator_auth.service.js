import { clearToken, saveToken } from "../helpers/auth_token.js";
import { getAPIResponseError } from "../helpers/common.js";
import { deleteAllLocalData, saveUserDetails } from "../helpers/localstorage.js";
import { successToast } from "../utils/toaster.js";
import api from "./api.service.js";
import jwt_decode from "jwt-decode";

const creatorRegister = async (userData) => {
  try {
    let res = await api.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const verifyToken = async (token) => {
  try {
    let res = await api.post(`/auth/verify/${token}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const creatorLogin = async (userData) => {
  try {
    let res = await api.post("/auth/login", userData);
    console.log(res.data);
    setLoginToken(res.data.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const creatorForgetPassword = async (data) => {
  try {
    let res = await api.post("/auth/forget-password", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const creatorResetPassword = async (data) => {
  try {
    let res = await api.post("/auth/reset-password", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const updateUser = (userId, userData) => api.put(`/users/${userId}`, userData);
const deleteUser = (userId) => api.delete(`/users/${userId}`);

const setLoginToken = (data) => {
  // save auth deteils and set token in header for request
  console.log(data.token);
  saveToken(data.token);
  // Decode token to get user data
  const decoded = jwt_decode(data.token);
  // Set current user in localstorage and redux
  saveUserDetails(decoded);
};

const logout = () => {
  /**
   * Remove token from localStorage
   * Remove auth header for future requests
   * Set current user to {} which will set isAuthenticated to false
   */
  clearToken();
  deleteAllLocalData();
};

export {
  creatorRegister,
  verifyToken,
  creatorLogin,
  creatorForgetPassword,
  creatorResetPassword,
  logout
};
