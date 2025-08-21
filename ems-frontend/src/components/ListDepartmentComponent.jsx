import { useEffect, useState } from "react";
import { deleteDepartment, listDepartments } from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllDepartments();
  }, []);

  function getAllDepartments() {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewDepartment() {
    navigator("/add-department");
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }

  function removeDepartment(id) {
    deleteDepartment(id)
      .then(() => {
        getAllDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container py-4">
      <h2 className="text-center">List of Departments</h2>
      <button className="btn btn-primary mb-3" onClick={addNewDepartment}>
        Add Department
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Assigned Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>
                {department.assignedEmployees && department.assignedEmployees.map((employee) => (
                  <div key={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateDepartment(department.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeDepartment(department.id)}
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

export default ListDepartmentComponent;