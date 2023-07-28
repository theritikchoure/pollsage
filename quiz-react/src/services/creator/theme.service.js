import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/creators'

const getAllThemes = async () => {
  try {
    let res = await api.get(`${url}/themes`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getAllThemesForForm = async () => {
  try {
    let res = await api.get(`${url}/themes/for-form`)
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
}

export {
    getAllThemes, getAllThemesForForm
};
