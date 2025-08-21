import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Employee Management System</h1>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Employee Management</h3>
              <p className="card-text">Manage your employees&apos; information, including personal details and contact information.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/employees')}
              >
                View Employees
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Department Management</h3>
              <p className="card-text">Organize and manage departments, assign employees, and track department structures.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/departments')}
              >
                View Departments
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Task Management</h3>
              <p className="card-text">Manage tasks and assignments for your employees, track progress and deadlines.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/tasks')}
              >
                View Tasks
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Attendance Management</h3>
              <p className="card-text">Track and manage employee attendance, view attendance records and generate reports.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/attendances')}
              >
                View Attendance
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Check-In Management</h3>
              <p className="card-text">Record and manage employee check-ins and check-outs, monitor attendance in real-time.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/check-ins')}
              >
                View Check-Ins
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Leave Management</h3>
              <p className="card-text">Submit and manage leave requests, track leave balances, and view leave history.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/leaves')}
              >
                View Leaves
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Shift Management</h3>
              <p className="card-text">Manage employee shifts, assign workers to shifts, and track shift schedules.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/shifts')}
              >
                View Shifts
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Asset Management</h3>
              <p className="card-text">Track company equipment, assign assets to employees, and manage asset lifecycle.</p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/assets')}
              >
                View Assets
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeComponent;