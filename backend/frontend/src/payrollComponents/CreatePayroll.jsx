import React, { useEffect, useState } from 'react';
import Head from '../employeesComponents/Head';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from '../utils/axios';

const CreatePayroll = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [serverError, setServerError] = useState('');

    const handleBackClick = () => {
        navigate(-1);
    };

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await axios.get(`/salary/getSalaryOfAEmployee/${id}`);
                setValue('salary', response.data.salary); // Set salary in the form
            } catch (err) {
                console.error("Error fetching salary: ", err);
                setServerError("Error fetching salary. Mention it manually.");
            }
        };

        fetchSalary();
    }, [id, setValue]);

    const onSubmit = async (payroll) => {
        try {
            const payrollData = {
                employeeId: id, 
                salary: payroll.salary,
                bonuses: payroll.bonuses || 0, 
                deductions: payroll.deductions || 0, 
                paymentDate: payroll.paymentDate
            };

            // Make the POST request with JSON data
            const response = await axios.post("/payroll/createPayroll", payrollData);

            console.log('Payroll created successfully : ', response.data);
            reset();
            toast.success("Payroll created successfully");
            navigate(`/payroll/${id}`);
        } catch (err) {
            console.error("Error creating payroll: ", err);
            toast.error(err.response?.data?.message || "Failed to create Payroll!");
        }
    };

    return (
        <div className='w-screen h-screen bg-zinc-800'>
            <Head />

            <button className='bg-zinc-200 px-3 py-2 text-black rounded-md m-5' onClick={handleBackClick}>
                Back
            </button>

            <div className='h-[84vh] rounded-md text-white flex justify-center items-center px-6 py-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-[40%] my-2 px-10 py-8 rounded-md border border-spacing-3'>

                    <h1 className='text-center text-2xl text-white'>Payroll Creation Form</h1>

                    {serverError && <p className="text-red-500 text-center">{serverError}</p>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="number"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Salary"
                            {...register("salary", { required: true, min: 10000 })}  // Salary with minimum value
                        />
                    </label>
                    {errors.salary && <span className="text-red-500 text-sm">Salary is required and should be at least 10,000</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="number"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Bonuses"
                            {...register("bonuses")}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="number"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Deductions"
                            {...register("deductions")}
                        />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="date"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Payment Date"
                            {...register("paymentDate", { required: true })}
                        />
                    </label>
                    {errors.paymentDate && <span className="text-red-500 text-sm">Payment date is required</span>}

                    <div className='flex justify-center items-center gap-5'>
                        <button type="submit" className='w-40 h-10 mt-5 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
                            Create Payroll
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreatePayroll;
