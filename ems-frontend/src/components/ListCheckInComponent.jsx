import { useEffect, useState } from 'react';
import CheckInService from '../services/CheckInService';
import { useNavigate } from 'react-router-dom';

const ListCheckInComponent = () => {
    const [checkIns, setCheckIns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listCheckIns();
    }, []);

    function listCheckIns() {
        CheckInService.getAllCheckIns()
            .then((response) => {
                setCheckIns(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewCheckIn() {
        navigate('/add-check-in');
    }

    return (
        <div className='container'>
            <h2 className='text-center mb-4'>Check-In Records</h2>
            <button className='btn btn-primary mb-3' onClick={addNewCheckIn}>Add Check-In</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee ID</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {checkIns.map(checkIn => (
                        <tr key={checkIn.id}>
                            <td>{checkIn.id}</td>
                            <td>{checkIn.employeeId}</td>
                            <td>{new Date(checkIn.dateTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCheckInComponent;