import { useEffect, useState } from "react";
import { deleteTask, listTasks } from "../services/TaskService";
import { useNavigate } from "react-router-dom";

const ListTaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllTasks();
  }, []);

  function getAllTasks() {
    listTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewTask() {
    navigator("/add-task");
  }

  function updateTask(id) {
    navigator(`/edit-task/${id}`);
  }

  function removeTask(id) {
    deleteTask(id)
      .then(() => {
        getAllTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container py-4">
      <h2 className="text-center">List of Tasks</h2>
      <button className="btn btn-primary mb-3" onClick={addNewTask}>
        Add Task
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Assigned Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.taskName}</td>
              <td>{task.taskDescription}</td>
              <td>
                {task.assignedEmployees && task.assignedEmployees.map((employee) => (
                  <div key={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateTask(task.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(task.id)}
                  style={{ marginLeft: "10px" }}
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

export default ListTaskComponent;