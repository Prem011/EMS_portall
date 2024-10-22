import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Head from './Head';

const Attendence = () => {
    const [payroll, setPayroll] = useState([]);
    const { id } = useParams(); 
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
          try {
            const response = await axios.get(`/api/attendence/readAttendence/${id}`);             
            setPayroll(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error('Error fetching employee data:', error);
          }
        };
    
        fetchEmployees();
      }, []);

      
    const handleDelete = async (employeeId) => {
        try {
        const response = await axios.post(`/api/employees/deleteEmployee/${employeeId}`);
        
        toast.error("Employee Deleted successfully", response.data);
        setEmployees(employees.filter(employee => employee._id !== employeeId));
        } catch (error) {
        console.error('Error deleting employee:', error.response ? error.response.data : error.message);
        }
    };

  return (
    <div className='w-screen h-screen bg-zinc-800'>

    <div className="flex justify-between px-10 py-4">
      <Link to={"/createEmployee"}>
        <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>
          Add Payroll of Employee
        </button>
      </Link>



      <div className='flex gap-10 items-center text-lg'>
        {/* <h1 className='text-white'>
          Employees count :- {employees.length}
        </h1>
      <input 
        type="text" 
        placeholder="Enter Search Keyword" 
        className="px-3 py-2 rounded-md" */}
      {/* /> */}
      </div>
    </div>

    <div className='px-10 py-4'>
      {payroll.length === 0 ? (
        <p className="text-white">No Payroll found. Please add payroll of the new employee.</p>
      ) : (
        <table className='table-auto w-full bg-white rounded-md'>
          <thead>
            <tr className='bg-gray-700 text-white'>
              <th className='px-4 py-2'>Salary</th>
              <th className='px-4 py-2'>Bonus</th>
              <th className='px-4 py-2'>Deductions</th>
              <th className='px-4 py-2'>PaymentDate</th>
              <th className='px-4 py-2'>Payroll Added Date</th>
              <th className='px-4 py-2'>Payroll updated Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((payroll, index) => (
              <tr key={index} className='bg-gray-100'>
                  
                  
                <td className='border px-4 py-2 text-center'>{payroll.salary}</td>
                <td className='border px-4 py-2 text-center'>{payroll.bonuses}</td>
                <td className='border px-4 py-2 text-center'>{payroll.deductions}</td>
                <td className='border px-4 py-2 text-center'>{new Date(payroll.paymentDate).toLocaleString()}</td>
                <td className='border px-4 py-2 text-center'>{new Date(payroll.createdAt).toLocaleString()}</td>
                <td className='border px-4 py-2 text-center'>{new Date(payroll.updatedAt).toLocaleString()}</td>

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
  )
}

export default Attendence


