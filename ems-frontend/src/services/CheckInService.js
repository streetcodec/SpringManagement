import axios from 'axios';

const CHECK_IN_API_BASE_URL = 'http://localhost:8081/api/checkin';

class CheckInService {
    getAllCheckIns() {
        return axios.get(`${CHECK_IN_API_BASE_URL}/check-in`);
    }

    createCheckIn(checkIn) {
        return axios.post(`${CHECK_IN_API_BASE_URL}/check-in`, checkIn);
    }
}

export default new CheckInService();