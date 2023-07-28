import { getAPIResponseError } from "../../helpers/common.js";
import api from "../api.service.js";

const url = '/creators'

const getPollsOverview = async () => {
    try {
        let res = await api.get(`${url}/dashboard/polls-overview`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const getPollsPerformance = async () => {
    try {
        let res = await api.get(`${url}/dashboard/polls-performance`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const getRecentActivities = async () => {
    try {
        let res = await api.get(`${url}/dashboard/recent-activity`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

const getAllActivities = async () => {
    try {
        let res = await api.get(`${url}/dashboard/all-activity`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        throw getAPIResponseError(error);
    }
};

export {
    getPollsOverview, getPollsPerformance, getRecentActivities, getAllActivities
};
