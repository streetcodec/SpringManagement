import { useEffect, useState } from "react";
import {
  createShift,
  getShiftById,
  updateShift,
} from "../services/ShiftService";
import { listEmployees } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const ShiftComponent = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState({
    startTime: "",
    endTime: "",
  });

  const navigator = useNavigate();
  const { id } = useParams();
  const [shiftName, setShiftName] = useState("");
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch all employees
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (id) {
      getShiftById(id)
        .then((response) => {
          const shift = response.data;
          setShiftName(shift.shiftName);
          const empIds = shift.employees?.map((emp) => emp.id) || [];
          setAssignedEmployees(empIds);
          setStartTime(formatDateTimeForInput(new Date(shift.startTime)));
          setEndTime(formatDateTimeForInput(new Date(shift.endTime)));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function formatDateTimeForInput(date) {
    return date.toISOString().slice(0, 16);
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!startTime) {
      errorsCopy.startTime = "Start time is required";
      valid = false;
    } else {
      errorsCopy.startTime = "";
    }

    if (!endTime) {
      errorsCopy.endTime = "End time is required";
      valid = false;
    } else if (new Date(endTime) <= new Date(startTime)) {
      errorsCopy.endTime = "End time must be after start time";
      valid = false;
    } else {
      errorsCopy.endTime = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  function saveShift(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const asEmpl = assignedEmployees.map((empId) => {
      const employee = employees.find((emp) => emp.id === empId);
      return employee;
    });

    const shift = {
      shiftName: shiftName,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      assignedEmployees: asEmpl
    };

    if (id) {
      updateShift(id, shift)
        .then(() => {
          navigator("/shifts");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createShift(shift)
        .then(() => {
          navigator("/shifts");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleStartTimeChange(e) {
    setStartTime(e.target.value);
    if (endTime && new Date(e.target.value) >= new Date(endTime)) {
      setErrors((prev) => ({
        ...prev,
        endTime: "End time must be after start time",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        endTime: "",
      }));
    }
  }

  // Function to assign an employee to the shift
  function assignEmployee(employeeId) {
    if (!assignedEmployees.includes(employeeId)) {
      setAssignedEmployees([...assignedEmployees, employeeId]);
    }
  }

  // Function to remove an employee from the shift
  function removeEmployee(employeeId) {
    setAssignedEmployees(assignedEmployees.filter((id) => id !== employeeId));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">{id ? "Update Shift" : "Add Shift"}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Start Time:</label>
                <input
                  type="datetime-local"
                  className={`form-control ${
                    errors.startTime ? "is-invalid" : ""
                  }`}
                  value={startTime}
                  onChange={handleStartTimeChange}
                />
                {errors.startTime && (
                  <div className="invalid-feedback">{errors.startTime}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">End Time:</label>
                <input
                  type="datetime-local"
                  className={`form-control ${
                    errors.endTime ? "is-invalid" : ""
                  }`}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                {errors.endTime && (
                  <div className="invalid-feedback">{errors.endTime}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Shift Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Assigned Employees:</label>
                <div className="list-group mb-2">
                  {assignedEmployees.length > 0 ? (
                    employees
                      .filter(emp => assignedEmployees.includes(emp.id))
                      .map(employee => (
                        <div key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {employee.firstName} {employee.lastName}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeEmployee(employee.id)}
                          >
                            Remove
                          </button>
                        </div>
                      ))
                  ) : (
                    <div className="list-group-item text-muted">No employees assigned to this shift</div>
                  )}
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Available Employees:</label>
                <div className="list-group">
                  {employees
                    .filter(employee => !assignedEmployees.includes(employee.id))
                    .map(employee => (
                      <div key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {employee.firstName} {employee.lastName}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => assignEmployee(employee.id)}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <button className="btn btn-success" onClick={saveShift}>
                {id ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftComponent;
