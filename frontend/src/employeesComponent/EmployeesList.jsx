import React, { useEffect, useState } from 'react';
import Head from './Head';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data from the actual API endpoint
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees/employeeData');
        // Access the employee array correctly from the response
        const employeeData = Array.isArray(response.data.data) ? response.data.data : [];
        setEmployees(employeeData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.post(`http://localhost:4001/employees/deleteEmployee/${employeeId}`);
      // console.log('Employee deleted:', response.data);
      toast.error("Employee Deleted successfully", response.data);
      setEmployees(employees.filter(employee => employee._id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error.response ? error.response.data : error.message);
    }
  };


  return (
    <div className='w-screen h-screen bg-zinc-800'>
      <Head />

      <div className="flex justify-between px-10 py-4">
        <Link to={"/createEmployee"}>
          <button className='px-4 py-2 bg-green-500 text-white rounded-md'>
            Add Employee
          </button>
        </Link>

        <input 
          type="text" 
          placeholder="Enter Search Keyword" 
          className="px-3 py-2 rounded-md"
        />
      </div>

     

      <div className='px-10 py-4'>
        {employees.length === 0 ? (
          <p className="text-white">No employees found. Please add a new employee.</p>
        ) : (
          <table className='table-auto w-full bg-white rounded-md'>
            <thead>
              <tr className='bg-gray-700 text-white'>
                <th className='px-4 py-2'>Unique ID</th>
                <th className='px-4 py-2'>Image</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Mobile No</th>
                <th className='px-4 py-2'>Designation</th>
                <th className='px-4 py-2'>Gender</th>
                <th className='px-4 py-2'>Course</th>
                <th className='px-4 py-2'>Create Date</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id || index} className='bg-gray-100'>
                  <td className='border px-4 py-2 text-center'>{employee.eId}</td>
                  <td className='border px-4 py-2'>
                    <img
                      src={`http://localhost:4001/images/${employee.image}`} 
                      alt={employee.name}
                      className='w-12 h-12 object-cover rounded-full'
                    />
                  </td>
                  <td className='border px-4 py-2'>{employee.name}</td>
                  <td className='border px-4 py-2'>{employee.email}</td>
                  <td className='border px-4 py-2'>{employee.mobile}</td>
                  <td className='border px-4 py-2'>{employee.designation}</td>
                  <td className='border px-4 py-2'>{employee.gender || 'N/A'}</td>
                  <td className='border px-4 py-2'>{employee.course}</td>
                  <td className='border px-4 py-2'>{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td className='border px-4 py-2'>
                    <Link to={`/updateEmployee/${employee._id}`} className="text-blue-500 mr-5">
                      Edit
                    </Link>
                    &nbsp;|&nbsp;
                    <button className="text-red-500 ml-4" onClick={() => handleDelete(employee._id)} >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmployeesList;
