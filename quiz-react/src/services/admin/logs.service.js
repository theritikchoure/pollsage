import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/admin/logs";

const getLogs = async (limit = 50, page = 1) => {
  try {
    let res = await api.get(`${url}?limit=${limit}&page=${page}`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
    getLogs
};
