import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/admin/dashboard/";

const getServerDetails = async () => {
  try {
    let res = await api.get(`${url}/server-details`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
    getServerDetails
};
