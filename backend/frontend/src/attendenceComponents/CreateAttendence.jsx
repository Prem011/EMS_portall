import React from 'react';
import Head from '../employeesComponents/Head'; // Adjust the path as necessary
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from '../utils/axios';

const CreateAttendance = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // This should be the employee ID

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

    // Watch check-in and check-out times to calculate duration
    const checkInTime = watch("checkInTime", "09:00");
    const checkOutTime = watch("checkOutTime", "17:00");

    // Calculate the difference between check-in and check-out times
    const calculateStatus = () => {
        const [checkInHours, checkInMinutes] = checkInTime.split(":").map(Number);
        const [checkOutHours, checkOutMinutes] = checkOutTime.split(":").map(Number);
        const checkIn = new Date();
        const checkOut = new Date();

        checkIn.setHours(checkInHours, checkInMinutes);
        checkOut.setHours(checkOutHours, checkOutMinutes);

        const diffInMs = checkOut - checkIn;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours >= 5) return "Present";
        if (diffInHours >= 3) return "Half Day";
        return "Leave";
    };

    const onSubmit = async (attendance) => {
        try {
            const attendanceData = {
                employeeId: id,                
                date: attendance.date,         
                checkInTime: attendance.checkInTime,
                checkOutTime: attendance.checkOutTime, 
                status: calculateStatus()  // Set status based on time difference
            };

            const response = await axios.post("/attendence/createAttendence", attendanceData);
            reset(); 
            toast.success("Attendance created successfully");
            navigate(-1); 
        } catch (err) {
            console.error("Error creating attendance: ", err);
            toast.error(err.response?.data?.error || "Failed to create attendance!");
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='w-screen h-screen bg-zinc-800'>
            <Head />
            <button className='bg-zinc-200 px-3 py-2 text-black rounded-md m-5' onClick={handleBackClick}>
                Back
            </button>

            <div className='h-[84vh] rounded-md text-white flex justify-center items-center px-6 py-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-[40%] my-2 px-10 py-8 rounded-md border border-spacing-3'>
                    <h1 className='text-center text-2xl text-white'>Attendance Creation Form</h1>

                    <label className="input hidden input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                          type="text"
                          value={id}
                          className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                          {...register("employeeId", { required: true })}
                        />
                    </label>
                    {errors.employeeId && <span className="text-red-500 text-sm">EmployeeId is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                          type="date"
                          className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                          defaultValue={new Date().toISOString().slice(0, 10)}
                          {...register("date", { required: true })}
                        />
                    </label>
                    {errors.date && <span className="text-red-500 text-sm">Date is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="time"
                            defaultValue="09:00"
                            placeholder='Check-in time'
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("checkInTime", { required: true })}
                        />
                    </label>
                    {errors.checkInTime && <span className="text-red-500 text-sm">Check-in time is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="time"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            defaultValue="17:00"
                            placeholder='Check-out time'
                            {...register("checkOutTime", { required: true })}
                        />
                    </label>
                    {errors.checkOutTime && <span className="text-red-500 text-sm">Check-out time is required</span>}

                    <div className='flex justify-center items-center gap-5'>
                        <button type="submit" className='w-40 h-10 mt-5 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
                            Create Attendance
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAttendance;
