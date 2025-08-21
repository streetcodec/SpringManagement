import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssetService from "../services/AssetService";
import { listEmployees } from "../services/EmployeeService";

const AssetComponent = () => {
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [assetType, setAssetType] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const statusOptions = [
    { value: "AVAILABLE", label: "Available" },
    { value: "ASSIGNED", label: "Assigned" },
    { value: "UNDER_MAINTENANCE", label: "Under Maintenance" },
    { value: "RETIRED", label: "Retired" },
  ];

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (id) {

      const path = window.location.pathname;
      if (path.includes("/view-asset/")) {
        setViewMode(true);
      }


      AssetService.getAssetById(id)
        .then((response) => {
          const asset = response.data;
          setName(asset.name);
          setSerialNumber(asset.serialNumber || "");
          setAssetType(asset.assetType || "");
          setStatus(asset.status || "AVAILABLE");
          setEmployeeId(asset.employeeId || "");

          if (asset.assignmentDate) {
            setAssignmentDate(asset.assignmentDate.split("T")[0]);
          }
          if (asset.returnDate) {
            setReturnDate(asset.returnDate.split("T")[0]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function validateForm() {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Asset name is required";
    }

    if (status === "ASSIGNED" && employeeId === "") {
      errors.employeeId = "Please select an employee for assigned assets";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleStatusChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (newStatus === "ASSIGNED" && employeeId === "") {
      setErrors((prev) => ({
        ...prev,
        employeeId: "Please select an employee for assigned assets",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.employeeId;
        return newErrors;
      });
    }

    if (newStatus !== "ASSIGNED") {
      setEmployeeId("");
      setAssignmentDate("");
      setReturnDate("");
    } else if (newStatus === "ASSIGNED" && !assignmentDate) {

      const today = new Date().toISOString().split("T")[0];
      setAssignmentDate(today);
    }
  }

  function saveOrUpdateAsset(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const asset = {
      name,
      serialNumber,
      assetType,
      status,
      employeeId: employeeId || null,
      assignmentDate: assignmentDate || null,
      returnDate: returnDate || null,
    };

    if (id) {
      AssetService.updateAsset(id, asset)
        .then(() => {
          navigate("/assets");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      AssetService.createAsset(asset)
        .then(() => {
          navigate("/assets");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleCancel() {
    navigate("/assets");
  }

  function getTitle() {
    if (viewMode) return "View Asset";
    return id ? "Edit Asset" : "Add Asset";
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="text-center">{getTitle()}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={saveOrUpdateAsset}>
                <div className="form-group mb-3">
                  <label className="form-label">Asset Name:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter asset name"
                    disabled={viewMode}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Serial Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Enter serial number"
                    disabled={viewMode}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Asset Type:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    placeholder="Enter asset type (laptop, phone, etc.)"
                    disabled={viewMode}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Status:</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={handleStatusChange}
                    disabled={viewMode}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {(status === "ASSIGNED" || employeeId) && (
                  <div className="form-group mb-3">
                    <label className="form-label">Assigned to Employee:</label>
                    <select
                      className={`form-control ${
                        errors.employeeId ? "is-invalid" : ""
                      }`}
                      value={employeeId}
                      onChange={(e) => {
                        setEmployeeId(e.target.value);
                        if (e.target.value) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.employeeId;
                            return newErrors;
                          });
                        }
                      }}
                      disabled={viewMode || status !== "ASSIGNED"}
                    >
                      <option value="">Select Employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.firstName} {employee.lastName}
                        </option>
                      ))}
                    </select>
                    {errors.employeeId && (
                      <div className="invalid-feedback">
                        {errors.employeeId}
                      </div>
                    )}
                  </div>
                )}

                {(status === "ASSIGNED" || assignmentDate) && (
                  <div className="form-group mb-3">
                    <label className="form-label">Assignment Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={assignmentDate}
                      onChange={(e) => setAssignmentDate(e.target.value)}
                      disabled={viewMode}
                    />
                  </div>
                )}

                {returnDate && (
                  <div className="form-group mb-3">
                    <label className="form-label">Return Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      disabled={viewMode}
                    />
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    {viewMode ? "Back" : "Cancel"}
                  </button>

                  {!viewMode && (
                    <button type="submit" className="btn btn-primary">
                      {id ? "Update" : "Save"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetComponent;
