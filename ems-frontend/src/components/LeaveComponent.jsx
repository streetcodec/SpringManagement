import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeaveService from '../services/LeaveService';
import { listEmployees } from '../services/EmployeeService';

const LeaveComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('PENDING');
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        listEmployees()
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        if (id) {
            LeaveService.getLeaveById(id)
                .then(response => {
                    const leave = response.data;
                    setSelectedEmployee(leave.employeeId);
                    setStartDate(new Date(leave.startDate).toISOString().split('T')[0]);
                    setEndDate(new Date(leave.endDate).toISOString().split('T')[0]);
                    setStatus(leave.status);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const saveOrUpdateLeave = (e) => {
        e.preventDefault();

        const leave = { employeeId: selectedEmployee, startDate, endDate, status };

        if (id) {
            LeaveService.updateLeave(id, leave)
                .then(() => {
                    navigate('/leaves');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            LeaveService.createLeave(leave)
                .then(() => {
                    navigate('/leaves');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const title = id ? 'Update Leave Request' : 'Create Leave Request';

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center mt-3'>{title}</h2>
                    <div className='card-body'>
                        <form onSubmit={saveOrUpdateLeave}>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Employee:</label>
                                <select
                                    className='form-control'
                                    value={selectedEmployee}
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                    required
                                >
                                    <option value=''>Select Employee</option>
                                    {employees.map(employee => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Start Date:</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>End Date:</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Status:</label>
                                <select
                                    className='form-control'
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value='PENDING'>Pending</option>
                                    <option value='APPROVED'>Approved</option>
                                    <option value='REJECTED'>Rejected</option>
                                </select>
                            </div>

                            <div className='text-center'>
                                <button type='submit' className='btn btn-success me-2'>Save</button>
                                <button type='button' className='btn btn-danger' onClick={() => navigate('/leaves')}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveComponent;