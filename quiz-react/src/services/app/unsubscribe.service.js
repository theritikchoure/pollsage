import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/unsubscribe";

const unsubscribeEmail = async (payload) => {
  try {
    let res = await api.post(`${url}`, payload);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
  unsubscribeEmail
};
