import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmergencyContactService from '../services/EmergencyContactService';
import { getEmployee } from '../services/EmployeeService';

const ListEmergencyContactComponent = () => {
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [employee, setEmployee] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { employeeId } = useParams();

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeAndContacts();
        } else {
            fetchAllEmergencyContacts();
        }
    }, [employeeId]);

    const fetchEmployeeAndContacts = async () => {
        try {
            setLoading(true);
            
            // Get employee details
            const employeeResponse = await getEmployee(employeeId);
            setEmployee(employeeResponse.data);
            
            // Get emergency contacts for this employee
            const contactsResponse = await EmergencyContactService.getEmergencyContactsByEmployeeId(employeeId);
            setEmergencyContacts(contactsResponse.data);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const fetchAllEmergencyContacts = async () => {
        try {
            setLoading(true);
            const response = await EmergencyContactService.getAllEmergencyContacts();
            setEmergencyContacts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching emergency contacts:', error);
            setLoading(false);
        }
    };

    const addEmergencyContact = () => {
        if (employeeId) {
            navigate(`/employees/${employeeId}/add-emergency-contact`);
        } else {
            navigate('/add-emergency-contact');
        }
    };

    const editEmergencyContact = (contactId) => {
        if (employeeId) {
            navigate(`/employees/${employeeId}/edit-emergency-contact/${contactId}`);
        } else {
            navigate(`/edit-emergency-contact/${contactId}`);
        }
    };

    const deleteEmergencyContact = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this emergency contact?')) {
            try {
                await EmergencyContactService.deleteEmergencyContact(contactId);
                
                // Refresh contacts list
                if (employeeId) {
                    fetchEmployeeAndContacts();
                } else {
                    fetchAllEmergencyContacts();
                }
            } catch (error) {
                console.error('Error deleting emergency contact:', error);
            }
        }
    };

    const goBack = () => {
        if (employeeId) {
            navigate('/employees');
        } else {
            navigate('/');
        }
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
    }

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="card-title mb-0">
                        {employeeId 
                            ? `Emergency Contacts for ${employee.firstName} ${employee.lastName}` 
                            : 'All Emergency Contacts'}
                    </h2>
                </div>
                <div className="card-body">
                    <div className="mb-3 d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={goBack}>
                            <i className="bi bi-arrow-left"></i> Back
                        </button>
                        <button className="btn btn-success" onClick={addEmergencyContact}>
                            <i className="bi bi-plus-circle"></i> Add Emergency Contact
                        </button>
                    </div>

                    {emergencyContacts.length === 0 ? (
                        <div className="alert alert-info">No emergency contacts found.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Relationship</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Priority</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emergencyContacts.map(contact => (
                                        <tr key={contact.id}>
                                            <td>{contact.name}</td>
                                            <td>{contact.relationship || '-'}</td>
                                            <td>{contact.phoneNumber}</td>
                                            <td>{contact.email || '-'}</td>
                                            <td>{contact.priority || 1}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-info btn-sm me-2" 
                                                    onClick={() => editEmergencyContact(contact.id)}
                                                >
                                                    <i className="bi bi-pencil"></i> Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger btn-sm" 
                                                    onClick={() => deleteEmergencyContact(contact.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListEmergencyContactComponent;