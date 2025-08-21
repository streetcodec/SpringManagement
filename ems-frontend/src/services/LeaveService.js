import axios from 'axios';

const LEAVE_API_BASE_URL = 'http://localhost:8081/api/leaves';

class LeaveService {
    createLeave(leaveData) {
        return axios.post(LEAVE_API_BASE_URL, leaveData);
    }

    getLeaveById(leaveId) {
        return axios.get(`${LEAVE_API_BASE_URL}/${leaveId}`);
    }

    getAllLeaves() {
        return axios.get(LEAVE_API_BASE_URL);
    }

    getLeavesByEmployeeId(employeeId) {
        return axios.get(`${LEAVE_API_BASE_URL}/employee/${employeeId}`);
    }

    updateLeave(leaveId, leaveData) {
        return axios.put(`${LEAVE_API_BASE_URL}/${leaveId}`, leaveData);
    }

    deleteLeave(leaveId) {
        return axios.delete(`${LEAVE_API_BASE_URL}/${leaveId}`);
    }
}

export default new LeaveService();