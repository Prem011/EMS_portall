import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './employeesComponents/Dashboard'
import EmployeesList from './employeesComponents/EmployeesList'
import CreateEmployee from './employeesComponents/CreateEmployee'
import UpdateEmployee from './employeesComponents/UpdateEmployee'
import { useAuth } from './context/AuthProvider'
import PayrollList from './payrollComponents/PayrollList'
import Attendence from './employeesComponents/Attendence'
import CreatePayroll from './payrollComponents/CreatePayroll'
import UpdatePayroll from './payrollComponents/UpdatePayroll'
import UpdateAttendence from './attendenceComponents/UpdateAttendence'
import CreateAttendence from './attendenceComponents/CreateAttendence';
import ReadAttendance from './attendenceComponents/ReadAttendence'

const ProtectedRoute = ({ element, ...rest }) => {
    const { authUser } = useAuth();
    return authUser ? element : <Navigate to="/login" />;
};

const App = () => {
    const { authUser } = useAuth();

    return (
        <Routes>
            <Route
                path='/'
                element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
                path='/login'
                element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
                path='/register'
                element={authUser ? <Navigate to="/" /> : <Register />}
            />
            <Route
                path='/employeesDetails'
                element={<ProtectedRoute element={<EmployeesList />} />}
            />
            <Route
                path='/createEmployee'
                element={<ProtectedRoute element={<CreateEmployee />} />}
            />
            <Route
                path='/updateEmployee/:id'
                element={<ProtectedRoute element={<UpdateEmployee />} />}
            />
            <Route
                path='/payroll/:id'
                element={<ProtectedRoute element={<PayrollList />} />}
            />
            <Route
                path='/createPayroll/:id'
                element={<ProtectedRoute element={<CreatePayroll/>} />}
            />
            <Route
                path='/updatePayroll/:id'
                element={<ProtectedRoute element={<UpdatePayroll/>} />}
            />
            <Route
                path='/attendence/:id'
                element={<ProtectedRoute element={<ReadAttendance />} />}
            />
            <Route
                path='/createAttendance/:id'
                element={<ProtectedRoute element={<CreateAttendence/>} />}
            />
            <Route
                path='/updateAttendance/:id'
                element={<ProtectedRoute element={<UpdateAttendence/>} />}
            />
        </Routes>
    );
};

export default App;
