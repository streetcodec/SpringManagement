import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, getTask, updateTask } from "../services/TaskService";
import { listEmployees } from "../services/EmployeeService";

const TaskComponent = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
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
      getTask(id)
        .then((response) => {
          const task = response.data;
          setTaskName(task.taskName);
          setTaskDescription(task.taskDescription);
          setAssignedEmployees(task.assignedEmployees || []);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateTask(e) {
    e.preventDefault();

    const task = { taskName, taskDescription, assignedEmployees };

    if (id) {
      updateTask(id, task)
        .then(() => {
          navigator("/tasks");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createTask(task)
        .then(() => {
          navigator("/tasks");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function assignEmployee(employeeId) {
    const employee = availableEmployees.find(emp => emp.id === employeeId);
    if (employee) {
      setAssignedEmployees([...assignedEmployees, employee]);
    }
  }

  function removeEmployee(employeeId) {
    setAssignedEmployees(assignedEmployees.filter(emp => emp.id !== employeeId));
  }

  function title() {
    return id ? "Update Task" : "Add Task";
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">{title()}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Task Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task name"
                  name="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Task Description:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter task description"
                  name="taskDescription"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Assign Employees:</label>
                <div className="list-group">
                  {availableEmployees
                    .filter(
                      (emp) =>
                        !assignedEmployees.some((assigned) => assigned.id === emp.id)
                    )
                    .map((employee) => (
                      <button
                        key={employee.id}
                        type="button"
                        className="list-group-item list-group-item-action"
                        onClick={() => assignEmployee(employee.id)}
                      >
                        {employee.firstName} {employee.lastName}
                      </button>
                    ))}
                </div>
              </div>

              {assignedEmployees.length > 0 && (
                <div className="form-group mb-2">
                  <label className="form-label">Assigned Employees:</label>
                  <div className="list-group">
                    {assignedEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
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
              )}

              <button
                className="btn btn-success"
                onClick={(e) => saveOrUpdateTask(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;