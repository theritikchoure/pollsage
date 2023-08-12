import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/admin/backup/";

const databaseBackup = async () => {
  try {
    let res = await api.post(`${url}`, '', {
        responseType: 'blob'
    });
    return res;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export {
    databaseBackup
};
