import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/creators'

const addEmailTemplate = async (payload) => {
    try {
        let res = await api.post(`${url}/email-templates`, payload)
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const getAllEmailTemplates = async () => {
    try {
        let res = await api.get(`${url}/email-templates`)
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const getEmailTemplateById = async (id) => {
    try {
        let res = await api.get(`${url}/email-templates/${id}`)
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const updateEmailTemplateById = async (id, payload) => {
    try {
        let res = await api.put(`${url}/email-templates/${id}`, payload)
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const deleteEmailTemplate = async (id) => {
    try {
        let res = await api.delete(`${url}/email-templates/${id}`)
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const handleTemplateStatus = async (id) => {
    try {
        let res = await api.put(`${url}/email-templates/status/${id}`)
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

export {
    addEmailTemplate, getAllEmailTemplates, getEmailTemplateById, updateEmailTemplateById, deleteEmailTemplate, handleTemplateStatus
};
