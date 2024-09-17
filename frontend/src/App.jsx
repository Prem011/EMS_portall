import React from 'react'
import Register from './Components/Register'
import Login from './Components/Login'
import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './employeesComponent/Dashboard'
import EmployeesList from './employeesComponent/EmployeesList'
import CreateEmployee from './employeesComponent/CreateEmployee'
import UpdateEmployee from './employeesComponent/UpdateEmployee'
import { useAuth } from './context/AuthProvider'

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
        </Routes>
    );
};

export default App;
