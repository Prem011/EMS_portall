import React, { useState } from 'react';

import axios from 'axios';
import Head from './Head';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CreateEmployee = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]); // Append image
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('mobile', data.mobile);
            formData.append('designation', data.designation);
            formData.append('gender', data.gender);
            formData.append('salary', data.salary);

            // Append each course selected
            data.course.forEach(course => {
                formData.append('course', course);
            });

            const response = await axios.post('/api/employees/createEmployee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // console.log('Employee created successfully:', response.data);
            reset();
            setImagePreview(null);
            toast.success("Employee added successfully");
            navigate('/employeesDetails'); // Redirect to employee list
        } catch (error) {
            console.error('Error creating employee:', error.response?.data || error);
            toast.error(error.response?.data?.error || "Failed to create employee");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Ensure only first selected file is previewed
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Create image preview URL
        }
    };

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className='w-screen h-screen bg-zinc-800'>
            <Head />

            <button className='bg-zinc-200 px-3 py-2 text-black rounded-md m-5' onClick={handleBackClick}>
                Back
            </button>

            <div className='h-[84vh] rounded-md text-white flex justify-center items-center px-6 py-4'>
                <form  onSubmit={handleSubmit(onSubmit)}  className='w-[40%] my-2 px-10 py-8 rounded-md border border-spacing-3' encType='multipart/form-data'>
                
                    {imagePreview && (
                        <div className="mt-4">
                            <h4 className="text-white mb-2">Image Preview:</h4>
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                    )}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="file"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("image", { required: true })}
                            onChange={handleImageChange}
                        />
                    </label>
                    {errors.image && <span className="text-red-500 text-sm">Image is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="text"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                    </label>
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="email"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                    </label>
                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="text"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Mobile"
                            {...register("mobile", { required: true, minLength: 10 })}
                        />
                    </label>
                    {errors.mobile && <span className="text-red-500 text-sm">Mobile number is required and should be at least 10 digits</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <select
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("designation", { required: true })}
                        >
                            <option value="" disabled>Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </label>
                    {errors.designation && <span className="text-red-500 text-sm">Designation is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <select
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("gender", { required: true })}
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </label>
                    {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}

                    <label className="block text-white text-sm font-medium mt-5 mb-1">
                        Select the courses
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <select
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("course", { required: true, minLength: 3 })}
                            multiple // Enable multiple selection
                        >
                            <option value="MCA">MCA</option>
                            <option value="BCA">BCA</option>
                            <option value="BSC">BSC</option>
                        </select>
                    </label>
                    {errors.course && <span className="text-red-500 text-sm">At least one course is required</span>}

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="text"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Salary in Rs. only"
                            {...register("salary", { required: true })}
                        />
                    </label>
                    {errors.salary && <span className="text-red-500 text-sm">Salary is required and should be at least 10000 min</span>}

                    <div className='flex justify-center items-center gap-5'>
                        <button type="submit" className='w-20 h-10 mt-5 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployee;
