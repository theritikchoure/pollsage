import { clearToken, saveToken } from "../helpers/auth_token.js";
import { getAPIResponseError } from "../helpers/common.js";
import { deleteAllLocalData, saveUserDetails } from "../helpers/localstorage.js";
import api from "./api.service.js";
import jwt_decode from "jwt-decode";

const adminLogin = async (userData) => {
  try {
    let res = await api.post("/admin/auth/login", userData);
    console.log(res.data);
    setLoginToken(res.data.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const setLoginToken = (data) => {
  // save auth details and set token in header for request
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
  adminLogin,
  logout,
};
