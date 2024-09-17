


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const UpdateEmployee = () => {
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');

  // Fetch the employee details on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/updateEmployee/${id}`);
        if (response.data && response.data.employee) {
          const employee = response.data.employee;
          // Set form values
          Object.keys(employee).forEach(key => setValue(key, employee[key]));

        // setValue('name', data.name);
                // setValue('email', data.email);
                // setValue('mobile', data.mobile);
                // setValue('designation', data.designation);
                // setValue('gender', data.gender);
                // setValue('course', data.course);
                // setImagePreview(`http://localhost:4001/${data.image}

        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setServerError('Error fetching employee details.');
      }
    };  

    fetchEmployee();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.post(`/api/employees/updateEmployee/${id}`, data);
      navigate('/employeesDetails'); // Redirect to employees list after successful update
    } catch (error) {
      console.error('Error updating employee:', error);
      setServerError('Error updating employee. Please check the details and try again.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    // <div className="w-screen h-screen bg-zinc-800 flex  justify-center items-center">

    //       {/* {serverError && <p className="text-red-500">{serverError}</p>} */}

    //   <form onSubmit={handleSubmit(onSubmit)} className=" w-[50%] px-10 py-6 mt-6 space-y-4">
    //   <h2 className="text-2xl font-bold text-white text-center pt-9">Update Employee Details</h2>
    //     <div>
    //       <label className='text-white' >Name</label>
    //       <input
    //         type="text"
    //         {...register('name', { required: 'Name is required' })}
    //         className="border p-2 w-full"
    //         />
    //         {serverError.name && <p className="text-red-500">{serverError.name.message}</p>}
    //       {errors.name && <p className="text-red-500">{errors.name.message}</p>}
    //     </div>

    //     <div>
    //       <label className='text-white' >Email</label>
    //       <input
    //         type="email"
    //         {...register('email', { 
    //             required: 'Email is required',
    //             pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' }
    //         })}
    //         className="border p-2 w-full"
    //         />
    //         {serverError.email && <p className="text-red-500">{serverError.email.message}</p>}
    //       {errors.email && <p className="text-red-500">{errors.email.message}</p>}
    //     </div>

    //     <div>
    //       <label className='text-white' >Mobile</label>
    //       <input
    //         type="text"
    //         {...register('mobile', { 
    //           required: 'Mobile is required',
    //           minLength: { value: 10, message: 'Mobile number must be at least 10 digits long' }
    //         })}
    //         className="border p-2 w-full"
    //       />
    //         {serverError.mobile && <p className="text-red-500">{serverError.mobile.message}</p>}
    //       {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
    //     </div>

    //     <div>
    //       <label className='text-white' >Designation</label>
    //       <input
    //         type="text"
    //         {...register('designation', { required: 'Designation is required' })}
    //         className="border p-2 w-full"
    //       />
    //         {serverError.designation && <p className="text-red-500">{serverError.designation.message}</p>}
    //       {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
    //     </div>

    //     <div>
    //       <label className='text-white' >Gender</label>
    //       <select
    //         {...register('gender', { required: 'Gender is required' })}
    //         className="border p-2 w-full"
    //       >
    //         <option value="Male">Male</option>
    //         <option value="Female">Female</option>
    //         <option value="Others">Others</option>
    //       </select>
    //       {serverError.gender && <p className="text-red-500">{serverError.gender.message}</p>}
    //       {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
    //     </div>

    //     <div className='text-white' >
    //       <label>Course</label>
    //       <input
    //         type="text"
    //         {...register('course', { required: 'Course is required' })}
    //         className="border p-2 w-full"
    //       />
    //       {errors.course && <p className="text-red-500">{errors.course.message}</p>}
    //     </div>

    //     <div className='text-white' >
    //       <label>Image</label>
    //       <input
    //         type="text"
    //         {...register('image')}
    //         className="border p-2 w-full"
    //       />
    //     </div>

    //     <div className='text-white' >
    //       {/* <label>Active</label> */}
    //       <input
    //         type="checkbox"
    //         {...register('active')}
    //         className="mr-2"
    //       />
    //       Active
    //     </div>

    //     <button type="submit" className="bg-blue-500 text-white p-2">
    //       Update Employee
    //     </button>
    //   </form>
    // </div>
     <div className='w-screen h-screen bg-zinc-800'>
            <button className='bg-zinc-200 px-3 py-2 rounded-md m-6' onClick={handleBackClick} >Back</button>
            <div className='h-[90%] rounded-md text-white flex justify-center items-center px-6 py-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='my-2 px-10 py-8 rounded-md border border-spacing-3' encType='multipart/form-data'>

                    <h1 className='text-center text-2xl' >Update Employees Details</h1>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="text"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="email"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="text"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            placeholder="Mobile"
                            {...register("mobile", { required: true })}
                        />
                        {errors.mobile && <span className="text-red-500 text-sm">Mobile number is required</span>}
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <select
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("designation", { required: true })}
                        >
                            <option value="" disabled>Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="sales">Sales</option>
                        </select>
                        {errors.designation && <span className="text-red-500 text-sm">Designation is required</span>}
                    </label>

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
                        {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
                    </label>

                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <select
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("course", { required: true })}
                        >
                            <option value="" disabled>Select Course</option>
                            <option value="MCA">MCA</option>
                            <option value="BCA">BCA</option>
                            <option value="BSC">BSC</option>
                        </select>
                        {errors.course && <span className="text-red-500 text-sm">Course is required</span>}
                    </label>

                    {/* Image Upload Field */}
                    <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
                        <input
                            type="file"
                            className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
                            {...register("image")}
                            // onChange={handleImageChange} // Handle image preview
                        />
                        {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
                    </label>

                    {/* Image Preview Section */}
                    {imagePreview && (
                        <div className="mt-4 ">
                            <h4 className="text-white mb-2 ">Image Preview:</h4>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-40 h-40 object-cover rounded-lg mx-auto"
                            />
                        </div>
                    )}

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

export default UpdateEmployee;
