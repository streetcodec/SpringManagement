import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState([{ key: "", value: "" }]);

  function handleDetailChange(index, field, value) {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  }

  function addDetailField() {
    setDetails([...details, { key: "", value: "" }]);
  }

  function removeDetailField(index) {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  }

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();
  const { id } = useParams();

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const detailsArray = [];
      details.forEach((detail) => {
        if (detail.key.trim() && detail.value.trim()) {
          detailsArray.push({ key: detail.key, value: detail.value });
        }
      });

      const employee = {
        firstName,
        lastName,
        email,
        details: detailsArray,
      };

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          if (response.data.details) {
            const detailsArray = Object.entries(response.data.details).map(
              ([key, value]) => ({ key, value })
            );
            setDetails(
              detailsArray.length > 0 ? detailsArray : [{ key: "", value: "" }]
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 py-4">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Additional Details:</label>
                {details.map((detail, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col">
                      <input
                        type="text"
                        placeholder="Key"
                        className="form-control"
                        value={detail.key}
                        onChange={(e) =>
                          handleDetailChange(index, "key", e.target.value)
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        placeholder="Value"
                        className="form-control"
                        value={detail.value}
                        onChange={(e) =>
                          handleDetailChange(index, "value", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeDetailField(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addDetailField}
                >
                  Add Detail
                </button>
              </div>

              <div className="form-group mb-3">
                <label className="form-label fw-bold">Emergency Contacts</label>
                {id && (
                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() =>
                        navigator(`/employees/${id}/emergency-contacts`)
                      }
                    >
                      <i className="bi bi-telephone-fill me-2"></i>
                      View/Manage Emergency Contacts
                    </button>
                  </div>
                )}
                {!id && (
                  <div className="alert alert-info">
                    You can add emergency contacts after saving the employee
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary mt-2"
                onClick={saveOrUpdateEmployee}
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

export default EmployeeComponent;
