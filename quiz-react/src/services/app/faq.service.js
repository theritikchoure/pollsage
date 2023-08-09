import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/faqs'

const getFaqByTag = async (tag) => {
  try {
    let res = await api.get(`${url}/${tag}`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
    getFaqByTag
};
