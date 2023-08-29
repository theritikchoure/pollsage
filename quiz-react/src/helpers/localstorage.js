import { isEmpty } from "./common";
import jwt_decode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'token';
const USER_DETAILS_KEY = 'user';

export const isAuthenticated = () => {
  const auth = {
    user: getUserDetails(),
    token: getAuthToken(),
  };

  if(!isEmpty(auth.token)) {
    const token = auth.token;
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
  
    if (decoded.exp > currentTime) {
      return auth.user;
    } else {
      deleteAllLocalData();
      return null;
    }
  }
}

export const saveAuthToken = (data) => {
  try {
    var jsonOfItem = localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) return JSON.parse(token);
    return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAuthToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveUserDetails = (data) => {
  try {
    var jsonOfItem = localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserDetails = () => {
  try {
    const user = localStorage.getItem(USER_DETAILS_KEY);
    if (user) return JSON.parse(user);
    return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserDetails = () => {
  try {
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAllLocalData = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  return true;
}

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
}