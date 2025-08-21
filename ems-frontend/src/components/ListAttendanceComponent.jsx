import { useEffect, useState } from 'react';
import AttendanceService from '../services/AttendanceService';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ListAttendanceComponent = () => {
    const [attendances, setAttendances] = useState([]);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const navigate = useNavigate();

    useEffect(() => {
        getAllAttendances();
    }, []);

    function getAllAttendances() {
        AttendanceService.getAllAttendance()
            .then((response) => {
                setAttendances(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewAttendance() {
        navigate('/add-attendance');
    }

    function updateAttendance(date) {
        navigate(`/edit-attendance/${date}`);
    }

    function deleteAttendance(date) {
        AttendanceService.deleteAttendanceByDate(date)
            .then(() => {
                getAllAttendances();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleDateChange(e) {
        setSelectedDate(e.target.value);
    }

    function filterByDate() {
        if (selectedDate) {
            AttendanceService.getAttendanceByDate(selectedDate)
                .then((response) => {
                    setAttendances([response.data]);
                })
                .catch(() => {
                    setAttendances([]);
                });
        } else {
            getAllAttendances();
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center mb-4'>Attendance List</h2>
            <div className='row mb-4'>
                <div className='col-md-6'>
                    <button className='btn btn-primary' onClick={addNewAttendance}>Add Attendance</button>
                </div>
                <div className='col-md-6 d-flex justify-content-end'>
                    <input
                        type='date'
                        className='form-control me-2'
                        style={{ width: '200px' }}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <button className='btn btn-secondary' onClick={filterByDate}>Filter</button>
                    <button className='btn btn-outline-secondary ms-2' onClick={getAllAttendances}>Clear</button>
                </div>
            </div>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Present Employees</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances.map(attendance => (
                        <tr key={attendance.id}>
                            <td>{format(new Date(attendance.date), 'yyyy-MM-dd')}</td>
                            <td>{attendance.presentEmployees?.length || 0} employees</td>
                            <td>
                                <button className='btn btn-primary btn-sm me-2' onClick={() => updateAttendance(attendance.date)}>Update</button>
                                <button className='btn btn-danger btn-sm' onClick={() => deleteAttendance(attendance.date)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAttendanceComponent;