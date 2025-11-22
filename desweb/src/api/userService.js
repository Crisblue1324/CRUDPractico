import axios from "axios";
import {getToken} from "./authService";
const API_URL = import.meta.env.VITE_API_URL + "/users";

const getConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    };
};

export const getUsers = () => axios.get(API_URL, getConfig());
export const createUser = (data) => axios.post(API_URL, data, getConfig());
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data, getConfig());
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`, getConfig());