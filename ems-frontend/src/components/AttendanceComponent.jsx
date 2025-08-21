import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AttendanceService from '../services/AttendanceService';
import { listEmployees } from '../services/EmployeeService';
import { format } from 'date-fns';

const AttendanceComponent = () => {
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const navigate = useNavigate();
    const { date: urlDate } = useParams();

    useEffect(() => {
        if (urlDate) {
            setDate(urlDate);
            AttendanceService.getAttendanceByDate(urlDate)
                .then((response) => {
                    const presentEmployees = response.data.presentEmployees || [];
                    setSelectedEmployees(presentEmployees.map(emp => emp.id));
                })
                .catch(error => {
                    console.error(error);
                });
        }

        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [urlDate]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const toggleEmployeeSelection = (employeeId) => {
        setSelectedEmployees(prev => {
            if (prev.includes(employeeId)) {
                return prev.filter(id => id !== employeeId);
            } else {
                return [...prev, employeeId];
            }
        });
    };

    const saveAttendance = (e) => {
        e.preventDefault();

        const attendance = {
            date: date,
            presentEmployees: employees.filter(emp => selectedEmployees.includes(emp.id))
        };

        if (urlDate) {
            AttendanceService.updateAttendanceByDate(date, attendance)
                .then(() => {
                    navigate('/attendances');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            AttendanceService.createAttendance(attendance)
                .then(() => {
                    navigate('/attendances');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>{urlDate ? 'Update Attendance' : 'Add Attendance'}</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className='form-label'>Date:</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    value={date}
                                    onChange={handleDateChange}
                                    disabled={!!urlDate}
                                />
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Mark Present Employees:</label>
                                <div className='list-group'>
                                    {employees.map(employee => (
                                        <label key={employee.id} className='list-group-item'>
                                            <input
                                                type='checkbox'
                                                className='form-check-input me-2'
                                                checked={selectedEmployees.includes(employee.id)}
                                                onChange={() => toggleEmployeeSelection(employee.id)}
                                            />
                                            {employee.firstName} {employee.lastName}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className='text-center'>
                                <button className='btn btn-success' onClick={saveAttendance}>Submit</button>
                                <button className='btn btn-danger ms-2' onClick={() => navigate('/attendances')}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceComponent;