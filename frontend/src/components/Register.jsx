import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            username: data.username,
            password: data.password
        };

        try {
            const response = await axios.post('http://192.168.1.4:8080/api/user/register', userInfo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Signup successful');
                const user = response.data;
                localStorage.setItem('EMS', JSON.stringify(user));
                login(user); // Call login function from context
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error('Error: ' + error.response.data.error);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    };

    return (
        <div className='w-screen h-screen rounded-md text-white flex justify-center items-center px-6 py-4 bg-zinc-900'>
            <form onSubmit={handleSubmit(onSubmit)} className='my-2 px-10 py-8 rounded-md border border-spacing-3'>
                <h1 className='text-green-500 text-2xl text-center'>
                    <span className='text-3xl'>Employees</span> <span>Management</span> System
                </h1>
                <h2 className='text-center text-xl py-4'>Admin Registration Form</h2>

                <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                    <input
                        type="text"
                        className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                        placeholder="Username"
                        {...register("username", { required: true })}
                    />
                    {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
                </label>
                <br />

                <label className="input input-bordered flex items-center gap-2 mb-1">
                    <input
                        type="password"
                        className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                </label>
                <br />

                <div className='flex justify-center items-center gap-5'>
                    <Link to="/login">Already have an account?</Link>
                    <button
                        type="submit"
                        className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
