  import React, { useEffect, useState } from 'react';
import Head from './Head';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees/employeeData');

        // Ensure the image URLs are absolute and handle undefined cases
        const employeeData = response.data.data.map(employee => {
          return {
              ...employee,
              image: employee.image && employee.image.startsWith('https://ems-portall-5.onrender.com/')
                  ? employee.image.replace('https://ems-portall-5.onrender.com/', '') // Remove the unwanted prefix
                  : `https://res.cloudinary.com/your-cloud-name/${employee.image || 'default-image.png'}` // Fallback to Cloudinary if image is not defined
          };
        });
      

        // setEmployees(response.data.data);
        // console.log(response.data.data)
        setEmployees(employeeData);
        // console.log(employeeData);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);


  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.post(`/api/employees/deleteEmployee/${employeeId}`);
      
      toast.sucess("Employee Deleted successfully", response.data);
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



        <div className='flex gap-10 items-center text-lg'>
          <h1 className='text-white'>
            Employees count :- {employees.length}
          </h1>
        <input 
          type="text" 
          placeholder="Enter Search Keyword" 
          className="px-3 py-2 rounded-md"
        />
        </div>
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
                <th className='px-4 py-2'>Salary</th>
                <th className='px-4 py-2'>Created Date</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id || index} className='bg-gray-100'>
                  <td className='border px-4 py-2 text-center'>{employee.eId}</td>
                  <td className='border px-4 flex justify-center items-center py-2'>
                    
                    <img
                      src={employee.image} 
                      alt={employee.name}
                      className='w-16 h-16 rounded-full'
                      
                    />
                  </td>
                  <td className='border px-4 py-2 text-center'>{employee.name}</td>
                  <td className='border px-4 py-2 text-center'>{employee.email}</td>
                  <td className='border px-4 py-2 text-center'>{employee.mobile}</td>
                  <td className='border px-4 py-2 text-center'>{employee.designation}</td>
                  <td className='border px-4 py-2 text-center'>{employee.gender || 'N/A'}</td>
                  <td className='border px-4 py-2 text-center'>{employee.course.join(', ')}</td>
                  <td className='border px-4 py-2 text-center'>{employee.salary}</td>
                  <td className='border px-4 py-2 text-center'>{new Date(employee.createdAt).toLocaleDateString()}</td>

                  <td className='border  py-2 mx-auto'>
                    <div className='flex justify-center' >
                    <Link to={`/updateEmployee/${employee._id}`} className="text-blue-500 mx-1">
                      Edit
                    </Link>
                    &nbsp;|&nbsp;
                    <Link to={`/payroll/${employee._id}`} className="text-blue-500 mx-1">
                      Payroll
                    </Link>
                    &nbsp;|&nbsp;
                    <Link to={`/attendence/${employee._id}`} className="text-blue-500 mx-1">
                      Attendence
                    </Link>
                    &nbsp;|&nbsp;
                    <button className="text-red-500 " onClick={() => handleDelete(employee._id)}>Delete</button>
                    </div>
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
