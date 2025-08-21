import axios from 'axios';

const ATTENDANCE_API_BASE_URL = 'http://localhost:8081/api/attendance';

class AttendanceService {
    getAllAttendance() {
        return axios.get(`${ATTENDANCE_API_BASE_URL}/attendance`);
    }

    createAttendance(attendance) {
        return axios.post(`${ATTENDANCE_API_BASE_URL}/attendance`, attendance);
    }

    getAttendanceById(attendanceId) {
        return axios.get(`${ATTENDANCE_API_BASE_URL}/attendance/${attendanceId}`);
    }

    getAttendanceByDate(date) {
        return axios.get(`${ATTENDANCE_API_BASE_URL}/attendance/date/${date}`);
    }

    updateAttendance(attendanceId, attendance) {
        return axios.put(`${ATTENDANCE_API_BASE_URL}/attendance/${attendanceId}`, attendance);
    }

    updateAttendanceByDate(date, attendance) {
        return axios.put(`${ATTENDANCE_API_BASE_URL}/attendance/date/${date}`, attendance);
    }

    deleteAttendance(attendanceId) {
        return axios.delete(`${ATTENDANCE_API_BASE_URL}/attendance/${attendanceId}`);
    }

    deleteAttendanceByDate(date) {
        return axios.delete(`${ATTENDANCE_API_BASE_URL}/attendance/date/${date}`);
    }

    markEmployeeAttendance(date, employeeId, isPresent) {
        return axios.put(`${ATTENDANCE_API_BASE_URL}/attendance/${date}/employees`, {
            employeeId: employeeId,
            isPresent: isPresent
        });
    }
}

export default new AttendanceService();