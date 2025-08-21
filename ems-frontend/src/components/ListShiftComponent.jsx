import { useEffect, useState } from "react";
import { getAllShifts, deleteShift } from "../services/ShiftService";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ListShiftComponent = () => {
  const [shifts, setShifts] = useState([]);
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    listShifts();
  }, []);

  function listShifts() {
    getAllShifts()
      .then((response) => {
        setShifts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewShift() {
    navigator("/add-shift");
  }

  function updateShift(id) {
    navigator(`/edit-shift/${id}`);
  }

  function removeShift(id) {
    deleteShift(id)
      .then(() => {
        listShifts();
        setMessage("Shift deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Shifts</h2>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <button className="btn btn-primary mb-2" onClick={addNewShift}>
        Add Shift
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Shift ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Assigned Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.id}</td>
              <td>{format(new Date(shift.startTime), "yyyy-MM-dd HH:mm")}</td>
              <td>{format(new Date(shift.endTime), "yyyy-MM-dd HH:mm")}</td>
              <td>
                {shift.assignedEmployees && shift.assignedEmployees.length > 0 ? (
                  shift.assignedEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="d-flex align-items-center mb-1"
                    >
                      <span>
                        {employee.firstName} {employee.lastName}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-muted">No employees assigned</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateShift(shift.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => removeShift(shift.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListShiftComponent;
