import axios from "axios";
import { BACKEND_URL } from "./helper";

// Example of API function with token from cookies
export const registerUser = async (data) => {
    return await axios.post(`${BACKEND_URL}users/register`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const userLogin = async (data) => {
    return await axios.post(`${BACKEND_URL}user/login`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const getUserById = async (id) => {
    return await axios.get(`${BACKEND_URL}user/${id}`, {
        withCredentials: true // Include credentials to send httpOnly cookies
    });
};

export const userLogout = async () => {
    return await axios.post(`${BACKEND_URL}users/logout`, {}, {
        withCredentials: true // Include credentials to send httpOnly cookies
    });
};

// Tasks

export const fetchTasksFromDatabase = async (userId) => {
    return axios.get(`${BACKEND_URL}tasks/${userId}`, {
        withCredentials: true,
    });
};

export const addTaskToDatabase = async (task) => {
    return axios.post(`${BACKEND_URL}tasks`, task, {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
};

export const editTaskInDatabase = async (id, updatedTask) => {
    return axios.put(`${BACKEND_URL}tasks/${id}`, updatedTask, {
        headers: { 
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
};

export const deleteTaskFromDatabase = async (id) => {
    return axios.delete(`${BACKEND_URL}tasks/${id}`, {
        withCredentials: true,
    });
};

export const toggleTodoInDatabase = async (id) => {
    return axios.patch(`${BACKEND_URL}tasks/toggle/${id}`, null, {
        withCredentials: true,
    });
};
