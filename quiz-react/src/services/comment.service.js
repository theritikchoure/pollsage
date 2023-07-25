import { getAPIResponseError } from "../helpers/common.js";
import api from "./api.service.js";

const url = "/comments";

const createComment = async (id, data) => {
  try {
    let res = await api.post(`${url}/${id}`, data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getComments = async (id, limit, page) => {
    try {
        let res = await api.get(`${url}/${id}?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
}

export {
  createComment, getComments
};
