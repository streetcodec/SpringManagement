import { useEffect, useState } from "react";
import { createDepartment, getDepartment, updateDepartment, assignEmployeeToDepartment, removeEmployeeFromDepartment } from "../services/DepartmentService";
import { listEmployees } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setAvailableEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (id) {
      getDepartment(id)
        .then((response) => {
          const department = response.data;
          setDepartmentName(department.departmentName);
          setAssignedEmployees(department.assignedEmployees || []);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateDepartment(e) {
    e.preventDefault();

    const department = { departmentName, assignedEmployees };

    if (id) {
      updateDepartment(id, department)
        .then(() => {
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createDepartment(department)
        .then(() => {
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function assignEmployee(employeeId) {
    if (id) {
      assignEmployeeToDepartment(id, employeeId)
        .then((response) => {
          setAssignedEmployees(response.data.assignedEmployees);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const employee = availableEmployees.find((emp) => emp.id === employeeId);
      if (employee) {
        setAssignedEmployees([...assignedEmployees, employee]);
      }
    }
  }

  function removeEmployee(employeeId) {
    if (id) {
      removeEmployeeFromDepartment(id, employeeId)
        .then((response) => {
          setAssignedEmployees(response.data.assignedEmployees);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setAssignedEmployees(assignedEmployees.filter((emp) => emp.id !== employeeId));
    }
  }

  function title() {
    return id ? "Update Department" : "Add Department";
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">{title()}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter department name"
                  name="departmentName"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Assigned Employees:</label>
                <div className="list-group">
                  {assignedEmployees.map((employee) => (
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
                  ))}
                </div>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Available Employees:</label>
                <div className="list-group">
                  {availableEmployees
                    .filter((employee) => !assignedEmployees.some((assigned) => assigned.id === employee.id))
                    .map((employee) => (
                      <div key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {employee.firstName} {employee.lastName}
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => assignEmployee(employee.id)}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateDepartment}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;