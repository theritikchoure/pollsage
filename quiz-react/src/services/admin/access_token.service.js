import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/admin/access-tokens";

const createAccessToken = async (data) => {
  try {
    let res = await api.post(`${url}`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getAccessTokens = async () => {
  try {
    let res = await api.get(`${url}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getAccessTokenById = async (id) => {
  try {
    let res = await api.get(`${url}/${id}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const deleteAccessToken = async (id) => {
  try {
    let res = await api.delete(`${url}/${id}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};


export {
  createAccessToken, getAccessTokens, getAccessTokenById, deleteAccessToken
};
