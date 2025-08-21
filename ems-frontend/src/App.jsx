import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import ListTaskComponent from './components/ListTaskComponent'
import TaskComponent from './components/TaskComponent'
import HomeComponent from './components/HomeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import ListAttendanceComponent from './components/ListAttendanceComponent'
import AttendanceComponent from './components/AttendanceComponent'
import ListCheckInComponent from './components/ListCheckInComponent'
import CheckInComponent from './components/CheckInComponent'
import ListLeaveComponent from './components/ListLeaveComponent'
import LeaveComponent from './components/LeaveComponent'
import ListShiftComponent from './components/ListShiftComponent'
import ShiftComponent from './components/ShiftComponent'
import ListAssetComponent from './components/ListAssetComponent'
import AssetComponent from './components/AssetComponent'
import ListEmergencyContactComponent from './components/ListEmergencyContactComponent'
import EmergencyContactComponent from './components/EmergencyContactComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element = {<HomeComponent />}></Route>
        <Route path='/employees' element = {<ListEmployeeComponent />}></Route>
        <Route path='/add-employee'  element={<EmployeeComponent />}></Route>
        <Route path='/edit-employee/:id'  element={<EmployeeComponent />}></Route>
        {/* Task Management Routes */}
        <Route path='/tasks' element={<ListTaskComponent />}></Route>
        <Route path='/add-task' element={<TaskComponent />}></Route>
        <Route path='/edit-task/:id' element={<TaskComponent />}></Route>
        {/* Department Management Routes */}
        <Route path='/departments' element={<ListDepartmentComponent />}></Route>
        <Route path='/add-department' element={<DepartmentComponent />}></Route>
        <Route path='/edit-department/:id' element={<DepartmentComponent />}></Route>
        {/* Attendance Management Routes */}
        <Route path='/attendances' element={<ListAttendanceComponent />}></Route>
        <Route path='/add-attendance' element={<AttendanceComponent />}></Route>
        <Route path='/edit-attendance/:date' element={<AttendanceComponent />}></Route>
        <Route path='/view-attendance/:date' element={<AttendanceComponent />}></Route>
        {/* Check-In Management Routes */}
        <Route path='/check-ins' element={<ListCheckInComponent />}></Route>
        <Route path='/add-check-in' element={<CheckInComponent />}></Route>
        {/* Leave Management Routes */}
        <Route path='/leaves' element={<ListLeaveComponent />}></Route>
        <Route path='/add-leave' element={<LeaveComponent />}></Route>
        <Route path='/edit-leave/:id' element={<LeaveComponent />}></Route>
        {/* Shift Management Routes */}
        <Route path='/shifts' element={<ListShiftComponent />}></Route>
        <Route path='/add-shift' element={<ShiftComponent />}></Route>
        <Route path='/edit-shift/:id' element={<ShiftComponent />}></Route>
        {/* Asset Management Routes */}
        <Route path='/assets' element={<ListAssetComponent />}></Route>
        <Route path='/add-asset' element={<AssetComponent />}></Route>
        <Route path='/edit-asset/:id' element={<AssetComponent />}></Route>
        <Route path='/view-asset/:id' element={<AssetComponent />}></Route>
        {/* Emergency Contact Routes */}
        <Route path='/employees/:employeeId/emergency-contacts' element={<ListEmergencyContactComponent />}></Route>
        <Route path='/employees/:empId/add-emergency-contact' element={<EmergencyContactComponent />}></Route>
        <Route path='/employees/:empId/edit-emergency-contact/:id' element={<EmergencyContactComponent />}></Route>
        <Route path='/add-emergency-contact' element={<EmergencyContactComponent />}></Route>
        <Route path='/edit-emergency-contact/:id' element={<EmergencyContactComponent />}></Route>
      </Routes>
      
      <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
