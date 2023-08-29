import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { deleteAuthToken, getAuthToken, saveAuthToken, deleteAllLocalData } from './localstorage';

export const setUpToken = () => {
  const token = getAuthToken();

  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
  
    if (decoded.exp > currentTime) {
      setAuthToken(token);
      return token;
    } else {
      deleteAllLocalData();
      clearToken();
    }
  }

  localStorage.setItem('user', null);
  return false;
}

export const saveToken = (access_token) => {
  setAuthToken(access_token);
  saveAuthToken(access_token);
};

export const clearToken = () => {
  deleteAuthToken();
  clearAuthToken();
};

// header methods
const setAuthToken = (token) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } catch (e) {
    console.log('Error while settup token', e);
  }
};

const clearAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};