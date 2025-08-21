import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaveService from '../services/LeaveService';
import { listEmployees } from '../services/EmployeeService';

const ListLeaveComponent = () => {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllLeaves();
        fetchEmployees();
    }, []);

    function fetchEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getEmployeeName(employeeId) {
        const employee = employees.find(emp => emp.id === employeeId);
        return employee ? `${employee.firstName} ${employee.lastName}` : employeeId;
    }

    function getAllLeaves() {
        LeaveService.getAllLeaves()
            .then((response) => {
                setLeaves(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewLeave() {
        navigate('/add-leave');
    }

    function updateLeave(id) {
        navigate(`/edit-leave/${id}`);
    }

    function deleteLeave(id) {
        LeaveService.deleteLeave(id)
            .then(() => {
                getAllLeaves();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='container'>
            <h2 className='text-center mb-4'>Leave Requests</h2>
            <button className='btn btn-primary mb-3' onClick={addNewLeave}>Request Leave</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map(leave =>
                        <tr key={leave.id}>
                            <td>{getEmployeeName(leave.employeeId)}</td>
                            <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td>{leave.status}</td>
                            <td>
                                <button className='btn btn-info me-2' onClick={() => updateLeave(leave.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => deleteLeave(leave.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListLeaveComponent;