import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Head from '../employeesComponents/Head';

const PayrollList = () => {
  const [payroll, setPayroll] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchpayroll = async () => {
      try {
        const response = await axios.get(`/api/payroll/readPayroll/${id}`);             
        setPayroll(response.data);
        // console.log(response.data);  
      } catch (error) {
        console.error('Error fetching payroll data:', error);
      }
    };
  
    fetchpayroll();
  }, [id]);

  const handleDelete = async (payrollId) => {
    try {
      await axios.post(`/api/payroll/deletePayroll/${payrollId}`);
      toast.success("Payroll deleted successfully");
      setPayroll(payroll.filter(item => item._id !== payrollId)); // Remove the deleted payroll entry
    } catch (error) {
      console.error('Error deleting payroll:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='w-screen h-screen bg-zinc-800'>
      <Head />

      <div className="flex justify-between px-10 py-4">
        <Link to={`/createPayroll/${id}`}>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>
            Add Payroll
          </button>
        </Link>
      </div>

      <div className='px-10 py-4'>
        {payroll.length === 0 ? (
          <p className="text-white">No Payroll found. Please add payroll of the new employee.</p>
        ) : (
          <table className='table-auto w-full bg-white rounded-md'>
            <thead>
              <tr className='bg-gray-700 text-white'>
                <th className='px-4 py-2'>Sr. No.</th>
                <th className='px-4 py-2'>Salary</th>
                <th className='px-4 py-2'>Bonus</th>
                <th className='px-4 py-2'>Deductions</th>
                <th className='px-4 py-2'>Payment Date</th>
                <th className='px-4 py-2'>Payroll Added Date</th>
                <th className='px-4 py-2'>Payroll Updated Date</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((payroll, index) => (
                <tr key={index} className='bg-gray-100'>
                  <td className='border px-4 py-2 text-center'>{index + 1}</td>
                  <td className='border px-4 py-2 text-center'>{payroll.salary}</td>
                  <td className='border px-4 py-2 text-center'>{payroll.bonuses}</td>
                  <td className='border px-4 py-2 text-center'>{payroll.deductions}</td>
                  <td className='border px-4 py-2 text-center'>{new Date(payroll.paymentDate).toLocaleString()}</td>
                  <td className='border px-4 py-2 text-center'>{new Date(payroll.createdAt).toLocaleString()}</td>
                  <td className='border px-4 py-2 text-center'>{new Date(payroll.updatedAt).toLocaleString()}</td>
                  <td className='border py-2 text-center'>
                    <div className='flex justify-center'>
                      <Link to={`/updatePayroll/${payroll._id}`} className="text-blue-500 mx-1">
                        Edit
                      </Link>
                      <span>&nbsp;|&nbsp;</span>
                      <button className="text-red-500" onClick={() => handleDelete(payroll._id)}>
                        Delete
                      </button>
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
};

export default PayrollList;
