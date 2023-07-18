import { getAPIResponseError } from "../helpers/common.js";
import api from "./api.service.js";

const getPoll = async (pollId) => {
  try {
    let res = await api.get(`/polls/${pollId}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
}

const createPoll = async (data) => {
  try {
    let res = await api.post("/polls", data);
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

export {
  createPoll, getPoll, submitPoll, getPollResult
};
