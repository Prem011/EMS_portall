import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdateAttendance = () => {
    const { id } = useParams();  // Attendance ID from the route params
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`/api/attendence/updateAttendence/${id}`);
                // console.log(response.data)
                const attendance = response.data;

                if (attendance) {
                    // Format the date
                    const formattedDate = new Date(attendance.date).toISOString().split('T')[0];
                    setValue("date", formattedDate);  // Set date field
                    Object.keys(attendance).forEach(key => setValue(key, attendance[key]));
                }
            } catch (error) {
                console.error('Error fetching attendance details:', error);
                setServerError('Error fetching attendance details.');
            }
        };

        fetchAttendance();
    }, [id, setValue]);


    const onSubmit = async (data) => {
        // console.log(data);
        try {
            await axios.post(`/api/attendance/updateAttendence/${id}`, data);   

            toast.success('Attendance updated successfully');
            navigate(-1);
        } catch (error) {
            console.error('Error updating attendance:', error);
            setServerError('Error updating attendance. Please check the details and try again.');
        }
    };
    

    // Handle Back Navigation
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='w-screen h-screen bg-zinc-800'>
            <button className='bg-zinc-200 px-3 py-2 rounded-md m-6' onClick={handleBackClick}>Back</button>
            <div className='h-[90%] rounded-md text-white flex justify-center items-center px-6 py-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='my-2 px-10 py-8 rounded-md border border-spacing-3'>

                    <h1 className='text-center text-2xl'>Update Attendance Time <br /> and Status</h1>

                    {/* Date */} 
                    {/* <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="date"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Date"
                            {...register("date", { required: true })}
                        />
                        {errors.date && <span className="text-red-500 text-sm">Date is required</span>}
                    </label> */}

                    {/* Status */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <select
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("status", { required: true })}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Half Day">Half Day</option>
                            <option value="Leave">Leave</option>
                        </select>
                        {errors.status && <span className="text-red-500 text-sm">Status is required</span>}
                    </label>

                    {/* Check-In Time */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="time"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Check-In Time"
                            {...register("checkInTime", { required: true })}
                        />
                        {errors.checkInTime && <span className="text-red-500 text-sm">Check-in time is required</span>}
                    </label>

                    {/* Check-Out Time */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="time"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Check-Out Time"
                            {...register("checkOutTime", { required: true })}
                        />
                        {errors.checkOutTime && <span className="text-red-500 text-sm">Check-out time is required</span>}
                    </label>

                    {/* Submit Button */}
                    <div className='flex justify-center items-center gap-5 mt-4'>
                        <button type="submit" className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
                            Update
                        </button>
                    </div>

                    {/* Server Error */}
                    {serverError && <p className='text-red-500 mt-4 text-center'>{serverError}</p>}
                </form>
            </div>
        </div>
    );
};

export default UpdateAttendance;
