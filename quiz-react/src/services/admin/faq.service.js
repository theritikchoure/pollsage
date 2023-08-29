import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/admin'

const getListOfPolls = async (page, limit) => {
  try {
    let res = await api.get(`${url}/faqs?limit=${limit}&page=${page}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getPollById = async (pollId) => {
  try {
    let res = await api.get(`${url}/faqs/id/${pollId}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const updatePoll = async (pollId, payload) => {
  try {
    let res = await api.put(`${url}/polls/${pollId}`, payload)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const createPoll = async (data) => {
  try {
    delete data.theme;
    let res = await api.post(`${url}/faqs`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const submitPoll = async (pollId, data) => {
  try {
    let res = await api.post(`/polls/submit/${pollId}`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getPollResult = async (pollId, data) => {
  try {
    let res = await api.get(`/polls/result/${pollId}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const deletePoll = async (pollId) => {
  try {
    let res = await api.delete(`${url}/polls/${pollId}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
  createPoll, getListOfPolls, submitPoll, getPollResult, deletePoll, getPollById, updatePoll
};
