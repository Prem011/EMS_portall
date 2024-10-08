import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const UpdatePayroll = () => {
    const { id } = useParams();  // Payroll ID from the route params
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [serverError, setServerError] = useState('');

    // Fetch Payroll Details on Component Mount
    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                const response = await axios.get(`/api/payroll/getSinglePayroll/${id}`);
                const payroll = response.data.payroll;

                if (payroll) {
                    // Format the payment date
                    const formattedDate = new Date(payroll.paymentDate).toISOString().split('T')[0];
                    setValue("paymentDate", formattedDate);  // Set payment date field
                    Object.keys(payroll).forEach(key => setValue(key, payroll[key]));
                }
            } catch (error) {
                console.error('Error fetching payroll details:', error);
                setServerError('Error fetching payroll details.');
            }
        };

        fetchPayroll();
    }, [id, setValue]);

    // Handle Form Submission to Update Payroll
    const onSubmit = async (data) => {
        try {
            await axios.post(`/api/payroll/updatePayroll/${id}`, data);
            toast.success('Payroll updated successfully');
            navigate(-1); // Navigate to the employees details page
        } catch (error) {
            console.error('Error updating payroll:', error);
            setServerError('Error updating payroll. Please check the details and try again.');
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

                    <h1 className='text-center text-2xl'>Update Payroll Details</h1>

                    {/* Salary */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="number"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Salary"
                            {...register("salary", { required: true })}
                        />
                        {errors.salary && <span className="text-red-500 text-sm">Salary is required</span>}
                    </label>

                    {/* Deductions */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="number"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Deductions"
                            {...register("deductions", { required: true })}
                        />
                        {errors.deductions && <span className="text-red-500 text-sm">Deductions are required</span>}
                    </label>

                    {/* Bonuses */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="number"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Bonuses"
                            {...register("bonuses", { required: true })}
                        />
                        {errors.bonuses && <span className="text-red-500 text-sm">Bonuses are required</span>}
                    </label>

                    {/* Payment Date */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="date"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Payment Date"
                            {...register("paymentDate", { required: true })}
                        />
                        {errors.paymentDate && <span className="text-red-500 text-sm">Payment date is required</span>}
                    </label>

                    {/* Submit Button */}
                    <div className='flex justify-center items-center gap-5 mt-4'>
                        <button type="submit" className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePayroll;
