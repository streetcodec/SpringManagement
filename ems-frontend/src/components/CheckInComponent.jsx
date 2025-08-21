import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckInService from "../services/CheckInService";
import { listEmployees } from "../services/EmployeeService";

const CheckInComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkIn = {
      employeeId: parseInt(selectedEmployee),
      dateTime: new Date().toISOString(),
    };

    CheckInService.createCheckIn(checkIn)
      .then(() => {
        navigate("/check-ins");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Record Check-In</h2>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="form-label">Select Employee:</label>
                <select
                  className="form-select"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  required
                >
                  <option value="">Choose an employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success">
                  Record Check-In
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => navigate("/check-ins")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInComponent;
