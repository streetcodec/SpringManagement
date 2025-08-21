import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8081/api/departments';

// Basic CRUD operations
export const listDepartments = () => axios.get(REST_API_BASE_URL + '/departments');

export const createDepartment = (department) => axios.post(REST_API_BASE_URL + '/departments', department);

export const getDepartment = (departmentId) => axios.get(REST_API_BASE_URL + '/departments/' + departmentId);

export const updateDepartment = (departmentId, department) => axios.put(REST_API_BASE_URL + '/departments/' + departmentId, department);

export const deleteDepartment = (departmentId) => axios.delete(REST_API_BASE_URL + '/departments/' + departmentId);

// Employee assignment operations
export const assignEmployeeToDepartment = (departmentId, employeeId) => 
    axios.put(REST_API_BASE_URL + '/departments/' + departmentId + '/employees', { employeeId });

export const removeEmployeeFromDepartment = (departmentId, employeeId) => 
    axios.delete(REST_API_BASE_URL + '/departments/' + departmentId + '/employees/' + employeeId);