import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/creators'

const getCommentsByPoll = async (pollId) => {
  try {
    let res = await api.get(`${url}/comments/${pollId}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
    getCommentsByPoll,
};
