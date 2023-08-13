import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = "/admin/backup";

const databaseBackup = async (collection = null) => {
  try {
    let res = await api.post(`${url}`, {collection}, {
      responseType: "blob",
    });
    return res;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const importData = async (data) => {
  try {
    let res = await api.post(`${url}/restore`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

const getCollections = async (data) => {
  try {
    let res = await api.get(`${url}/collections`);
    return res.data;
  } catch (error) {
    throw getAPIResponseError(error);
  }
};

export { databaseBackup, importData, getCollections };
