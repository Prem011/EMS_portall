import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Head from '../employeesComponents/Head';

const ReadAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const { id } = useParams(); // Assuming id is the employee ID

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`/api/attendence/readAttendance/${id}`);
        // console.log(response);        
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, [id]);


  // Function to get the appropriate status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return 'text-green-500'; // Green for present
      case 'absent':
        return 'text-red-500'; // Red for absent
      case 'half day':
        return 'text-yellow-500'; // Yellow for half day
      case 'leave':
        return 'text-blue-500'; // Blue for leave
      default:
        return 'text-gray-500'; // Default color if the status is unknown
    }
  };

  return (
    <div className='w-screen h-screen bg-zinc-800'>
      <Head />

      <div className="flex justify-between px-10 py-4">
        <Link to={`/createAttendance/${id}`}>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>
            Add Attendance
          </button>
        </Link>
      </div>

      <div className='px-10 py-4'>
        {attendance.length === 0 ? (
          <p className="text-white">No attendance records found. Please add attendance for the employee.</p>
        ) : (
          <table className='table-auto w-full bg-white rounded-md'>
            <thead>
              <tr className='bg-gray-700 text-white'>
                <th className='px-4 py-2'>Sr. No.</th>
                <th className='px-4 py-2'>Date</th>
                <th className='px-4 py-2'>Check-In Time</th>
                <th className='px-4 py-2'>Check-Out Time</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((attendanceItem, index) => (
                <tr key={attendanceItem._id} className='bg-gray-100'>
                  <td className='border px-4 py-2 text-center'>{index + 1}</td>
                  <td className='border px-4 py-2 text-center'>{new Date(attendanceItem.date).toLocaleDateString()}</td>
                  <td className='border px-4 py-2 text-center'>{attendanceItem.checkInTime}</td>
                  <td className='border px-4 py-2 text-center'>{attendanceItem.checkOutTime}</td>
                  <td className={`border px-4 py-2 text-center ${getStatusColor(attendanceItem.status)}`}>
                    {attendanceItem.status}
                  </td>
                  <td className='border py-2 text-center'>
                    <div className='flex justify-center'>
                      <Link to={`/updateAttendance/${attendanceItem._id}`} className="text-blue-500 mx-1">
                        Edit Attendence
                      </Link>
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

export default ReadAttendance;
