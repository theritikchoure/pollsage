import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/admin/polls";

const createPoll = async (data) => {
  try {
    let res = await api.post(`${url}`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getAllPolls = async () => {
  try {
    let res = await api.get(`${url}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getPollById = async (id) => {
  try {
    let res = await api.get(`${url}/${id}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const deletePolls = async (id) => {
  try {
    let res = await api.delete(`${url}/${id}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};


export {
  createPoll, getAllPolls, getPollById, deletePolls
};
