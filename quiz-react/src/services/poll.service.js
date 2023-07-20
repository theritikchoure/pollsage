import { getAPIResponseError } from "../helpers/common.js";
import api from "./api.service.js";

const getPoll = async (pollId, password = null) => {
  try {
    let url;
    if (password) {
      url = `/polls/${pollId}?password=${password}`;
    } else {
      url = `/polls/${pollId}`;
    }

    let res = await api.get(url);
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

const checkPasswordProtection = async (pollId) => {
  try {
    let res = await api.get(`/polls/check-password/${pollId}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
  createPoll, getPoll, submitPoll, getPollResult, checkPasswordProtection
};
