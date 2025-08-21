import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/tasks';

// Basic CRUD operations
export const listTasks = () => axios.get(REST_API_BASE_URL + '/tasks');

export const createTask = (task) => axios.post(REST_API_BASE_URL + '/tasks', task);

export const getTask = (taskId) => axios.get(REST_API_BASE_URL + '/tasks/' + taskId);

export const updateTask = (taskId, task) => axios.put(REST_API_BASE_URL + '/tasks/' + taskId, task);

export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL + '/tasks/' + taskId);

// Employee assignment operations
export const assignEmployeeToTask = (taskId, employeeId) => 
    axios.put(REST_API_BASE_URL + '/tasks/' + taskId + '/employees', { employeeId });

export const removeEmployeeFromTask = (taskId, employeeId) => 
    axios.delete(REST_API_BASE_URL + '/tasks/' + taskId + '/employees/' + employeeId);