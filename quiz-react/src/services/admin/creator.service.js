import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/admin'

const getListOfCreators = async (page, limit) => {
  try {
    let res = await api.get(`${url}/creators/?limit=${limit}&page=${page}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getCreatorById = async (pollId) => {
  try {
    let res = await api.get(`${url}/faqs/id/${pollId}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const updateCreator = async (pollId, payload) => {
  try {
    let res = await api.put(`${url}/polls/${pollId}`, payload)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const createCreator = async (data) => {
  try {
    delete data.theme;
    let res = await api.post(`${url}/faqs`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const submitCreator = async (pollId, data) => {
  try {
    let res = await api.post(`/polls/submit/${pollId}`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getCreatorResult = async (pollId, data) => {
  try {
    let res = await api.get(`/polls/result/${pollId}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const deleteCreator = async (pollId) => {
  try {
    let res = await api.delete(`${url}/polls/${pollId}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
  createCreator, getListOfCreators, submitCreator, getCreatorResult, deleteCreator, getCreatorById, updateCreator
};
