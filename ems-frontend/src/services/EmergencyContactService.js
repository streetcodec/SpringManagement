import axios from 'axios';

const EMERGENCY_CONTACT_API_BASE_URL = 'http://localhost:8081/api/emergency-contacts';

class EmergencyContactService {
    getAllEmergencyContacts() {
        return axios.get(EMERGENCY_CONTACT_API_BASE_URL);
    }

    createEmergencyContact(emergencyContact) {
        return axios.post(EMERGENCY_CONTACT_API_BASE_URL, emergencyContact);
    }

    getEmergencyContactById(emergencyContactId) {
        return axios.get(`${EMERGENCY_CONTACT_API_BASE_URL}/${emergencyContactId}`);
    }

    getEmergencyContactsByEmployeeId(employeeId) {
        return axios.get(`${EMERGENCY_CONTACT_API_BASE_URL}/employee/${employeeId}`);
    }

    updateEmergencyContact(emergencyContactId, emergencyContact) {
        return axios.put(`${EMERGENCY_CONTACT_API_BASE_URL}/${emergencyContactId}`, emergencyContact);
    }

    deleteEmergencyContact(emergencyContactId) {
        return axios.delete(`${EMERGENCY_CONTACT_API_BASE_URL}/${emergencyContactId}`);
    }
}

export default new EmergencyContactService();