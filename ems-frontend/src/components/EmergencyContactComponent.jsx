import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmergencyContactService from '../services/EmergencyContactService';
import { listEmployees, getEmployee } from '../services/EmployeeService';

const EmergencyContactComponent = () => {
    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [priority, setPriority] = useState(1);
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { id, empId } = useParams();  // id for emergency contact, empId for employee

    useEffect(() => {
        // If we're accessing this page with an employee ID in the route
        if (empId) {
            setEmployeeId(empId);
            fetchEmployeeDetails(empId);
        } else {
            // Otherwise, load all employees for the dropdown
            fetchEmployees();
        }

        // If we're editing an existing emergency contact
        if (id) {
            fetchEmergencyContact(id);
        }
    }, [id, empId]);

    const fetchEmployees = async () => {
        try {
            const response = await listEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const fetchEmployeeDetails = async (id) => {
        try {
            const response = await getEmployee(id);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    const fetchEmergencyContact = async (contactId) => {
        setLoading(true);
        try {
            const response = await EmergencyContactService.getEmergencyContactById(contactId);
            const contact = response.data;
            
            setName(contact.name);
            setRelationship(contact.relationship || '');
            setPhoneNumber(contact.phoneNumber);
            setEmail(contact.email || '');
            setAddress(contact.address || '');
            setPriority(contact.priority || 1);
            
            if (contact.employeeId) {
                setEmployeeId(contact.employeeId);
                if (!empId) { // Only fetch if we don't already have the employee details
                    fetchEmployeeDetails(contact.employeeId);
                }
            }
        } catch (error) {
            console.error('Error fetching emergency contact:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[0-9+\-\s()]*$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Phone number contains invalid characters';
        }
        
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!employeeId) {
            newErrors.employeeId = 'Please select an employee';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const saveOrUpdateEmergencyContact = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const emergencyContact = {
            name,
            relationship,
            phoneNumber,
            email,
            address,
            priority,
            employeeId
        };
        
        setLoading(true);
        
        try {
            if (id) {
                // Update existing emergency contact
                await EmergencyContactService.updateEmergencyContact(id, emergencyContact);
            } else {
                // Create new emergency contact
                await EmergencyContactService.createEmergencyContact(emergencyContact);
            }
            
            // Navigate back to the appropriate page
            if (empId) {
                navigate(`/employees/${empId}/emergency-contacts`);
            } else {
                navigate('/employees');
            }
        } catch (error) {
            console.error('Error saving emergency contact:', error);
            setErrors({
                submit: 'There was an error saving the emergency contact. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const cancelOperation = () => {
        if (empId) {
            navigate(`/employees/${empId}/emergency-contacts`);
        } else {
            navigate('/employees');
        }
    };

    if (loading && id) {
        return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
    }

    const title = id ? 'Update Emergency Contact' : 'Add Emergency Contact';

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title mb-0">{title}</h2>
                        </div>
                        <div className="card-body">
                            {employee && (
                                <div className="alert alert-info">
                                    Adding emergency contact for: <strong>{employee.firstName} {employee.lastName}</strong>
                                </div>
                            )}
                            
                            {errors.submit && (
                                <div className="alert alert-danger">{errors.submit}</div>
                            )}
                            
                            <form onSubmit={saveOrUpdateEmergencyContact}>
                                <div className="mb-3">
                                    <label className="form-label">Name *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full name of emergency contact"
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Relationship</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={relationship}
                                        onChange={(e) => setRelationship(e.target.value)}
                                        placeholder="e.g. Spouse, Parent, Child"
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Phone Number *</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Emergency contact phone number"
                                    />
                                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Emergency contact email address"
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Emergency contact address"
                                        rows="2"
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Priority</label>
                                    <select
                                        className="form-control"
                                        value={priority}
                                        onChange={(e) => setPriority(Number(e.target.value))}
                                    >
                                        <option value="1">1 - Primary</option>
                                        <option value="2">2 - Secondary</option>
                                        <option value="3">3 - Tertiary</option>
                                        <option value="4">4 - Other</option>
                                    </select>
                                    <small className="form-text text-muted">Lower number indicates higher priority</small>
                                </div>
                                
                                {!empId && (
                                    <div className="mb-3">
                                        <label className="form-label">Employee *</label>
                                        <select
                                            className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                                            value={employeeId}
                                            onChange={(e) => setEmployeeId(e.target.value)}
                                            disabled={!!empId} // Disable if we have an employee ID from the route
                                        >
                                            <option value="">Select Employee</option>
                                            {employees.map(emp => (
                                                <option key={emp.id} value={emp.id}>
                                                    {emp.firstName} {emp.lastName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
                                    </div>
                                )}
                                
                                <div className="d-flex justify-content-between mt-4">
                                    <button type="button" className="btn btn-secondary" onClick={cancelOperation}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Emergency Contact'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContactComponent;