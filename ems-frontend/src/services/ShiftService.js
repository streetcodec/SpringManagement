import axios from 'axios';

const SHIFT_REST_API_BASE_URL = 'http://localhost:8081/api/shifts';

export const createShift = (shift) => axios.post(SHIFT_REST_API_BASE_URL, shift);

export const getShiftById = (shiftId) => axios.get(SHIFT_REST_API_BASE_URL + '/' + shiftId);

export const getAllShifts = () => axios.get(SHIFT_REST_API_BASE_URL);

export const updateShift = (shiftId, shift) => axios.put(SHIFT_REST_API_BASE_URL + '/' + shiftId, shift);

export const deleteShift = (shiftId) => axios.delete(SHIFT_REST_API_BASE_URL + '/' + shiftId);

export const assignEmployeeToShift = (shiftId, employeeId) => 
    axios.put(`${SHIFT_REST_API_BASE_URL}/${shiftId}/employees/${employeeId}`);

export const removeEmployeeFromShift = (shiftId, employeeId) => 
    axios.delete(`${SHIFT_REST_API_BASE_URL}/${shiftId}/employees/${employeeId}`);