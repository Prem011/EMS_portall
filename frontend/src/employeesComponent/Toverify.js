// import React, { useState, useEffect } from 'react';
// import { useForm } from "react-hook-form";
// import { useParams } from 'react-router-dom'; // To get the employeeId from the URL
// import axios from 'axios';

// const UpdateEmployee = () => {
//     const [imagePreview, setImagePreview] = useState(null); // State to hold image preview
//     const [employeeData, setEmployeeData] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         designation: "",
//         gender: "",
//         course: "",
//         image: "",
//         active: true,
//     }); // State to hold current employee data
//     const { _id } = useParams(); 

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm();

//     // Fetch employee data for the given employeeId and pre-fill the form
//     useEffect(() => {
//         const fetchEmployeeData = async () => {
//             try { 
//                     if (!_id) {
//                       throw new Error('Employee ID is not provided');
//                     }

//                 const response = await axios.get(`http://localhost:4001/employees/updateEmployee/${id}`);

//                 if (response.data && response.data.employee) {
//                 setEmployee(response.data.employee); 
//                 }            

//                 // const data = response.data;
//                 // console.log(data);
//                 // setEmployeeData(data);

//                 // // Set form values based on fetched data
//                 // setValue('name', data.name);
//                 // setValue('email', data.email);
//                 // setValue('mobile', data.mobile);
//                 // setValue('designation', data.designation);
//                 // setValue('gender', data.gender);
//                 // setValue('course', data.course);
//                 // setImagePreview(`http://localhost:4001/${data.image}`); // Set the current image as preview
//             } catch (error) {
//                 console.error('Error fetching employee data:', error);
//             }
//         };

//         if (_id) {
//             fetchEmployeeData();
//         }
//     }, [_id]);

//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData();
//             formData.append('name', data.name);
//             formData.append('email', data.email);
//             formData.append('mobile', data.mobile);
//             formData.append('designation', data.designation);
//             formData.append('gender', data.gender);
//             formData.append('course', data.course);

//             if (data.image[0]) {
//                 formData.append('image', data.image[0]); // Append new image if uploaded
//             }

//             // Send PUT request to update the employee data
//             const response = await axios.post(`http://localhost:4001/employees/updateEmployee/${employee._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Employee updated successfully:', response.data);
//         } catch (error) {
//             console.error('Error updating employee:', error);
//         }
//     };

//     // Function to handle image change and set preview
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImagePreview(URL.createObjectURL(file)); // Create image preview URL
//         }
//     };

//     if (!employeeData) {
//         return <p>Loading...</p>; // Show loading state while fetching data
//     }

//     return (
//         <div className='w-screen h-screen bg-zinc-800'>
//             <button>Back</button>
//             <div className='h-[90%] rounded-md text-white flex justify-center items-center px-6 py-4'>
//                 <form onSubmit={handleSubmit(onSubmit)} className='my-2 px-10 py-8 rounded-md border border-spacing-3' encType='multipart/form-data'>

//                     <h1 className='text-center text-2xl' >Update Employees Details</h1>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="text"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Name"
//                             value={employeeData.name}
//                             {...register("name", { required: true })}
//                         />
//                         {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="email"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Email"
//                             {...register("email", { required: true })}
//                         />
//                         {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="text"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Mobile"
//                             {...register("mobile", { required: true })}
//                         />
//                         {errors.mobile && <span className="text-red-500 text-sm">Mobile number is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("designation", { required: true })}
//                         >
//                             <option value="" disabled>Select Designation</option>
//                             <option value="HR">HR</option>
//                             <option value="Manager">Manager</option>
//                             <option value="sales">Sales</option>
//                         </select>
//                         {errors.designation && <span className="text-red-500 text-sm">Designation is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("gender", { required: true })}
//                         >
//                             <option value="" disabled>Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Others">Others</option>
//                         </select>
//                         {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("course", { required: true })}
//                         >
//                             <option value="" disabled>Select Course</option>
//                             <option value="MCA">MCA</option>
//                             <option value="BCA">BCA</option>
//                             <option value="BSC">BSC</option>
//                         </select>
//                         {errors.course && <span className="text-red-500 text-sm">Course is required</span>}
//                     </label>

//                     {/* Image Upload Field */}
//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="file"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("image")}
//                             onChange={handleImageChange} // Handle image preview
//                         />
//                         {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
//                     </label>

//                     {/* Image Preview Section */}
//                     {imagePreview && (
//                         <div className="mt-4 ">
//                             <h4 className="text-white mb-2 ">Image Preview:</h4>
//                             <img
//                                 src={imagePreview}
//                                 alt="Preview"
//                                 className="w-40 h-40 object-cover rounded-lg mx-auto"
//                             />
//                         </div>
//                     )}

//                     <div className='flex justify-center items-center gap-5 mt-4'>
//                         <button type="submit" className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
//                             Update
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateEmployee;































// <div className="w-screen h-screen bg-zinc-800 flex  justify-center items-center">

//           {/* {serverError && <p className="text-red-500">{serverError}</p>} */}

//       <form onSubmit={handleSubmit(onSubmit)} className=" w-[50%] px-10 py-6 mt-6 space-y-4">
//       <h2 className="text-2xl font-bold text-white text-center pt-9">Update Employee Details</h2>
//         <div>
//           <label className='text-white' >Name</label>
//           <input
//             type="text"
//             {...register('name', { required: 'Name is required' })}
//             className="border p-2 w-full"
//             />
//             {serverError.name && <p className="text-red-500">{serverError.name.message}</p>}
//           {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//         </div>

//         <div>
//           <label className='text-white' >Email</label>
//           <input
//             type="email"
//             {...register('email', { 
//                 required: 'Email is required',
//                 pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' }
//             })}
//             className="border p-2 w-full"
//             />
//             {serverError.email && <p className="text-red-500">{serverError.email.message}</p>}
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//         </div>

//         <div>
//           <label className='text-white' >Mobile</label>
//           <input
//             type="text"
//             {...register('mobile', { 
//               required: 'Mobile is required',
//               minLength: { value: 10, message: 'Mobile number must be at least 10 digits long' }
//             })}
//             className="border p-2 w-full"
//           />
//             {serverError.mobile && <p className="text-red-500">{serverError.mobile.message}</p>}
//           {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
//         </div>

//         <div>
//           <label className='text-white' >Designation</label>
//           <input
//             type="text"
//             {...register('designation', { required: 'Designation is required' })}
//             className="border p-2 w-full"
//           />
//             {serverError.designation && <p className="text-red-500">{serverError.designation.message}</p>}
//           {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
//         </div>

//         <div>
//           <label className='text-white' >Gender</label>
//           <select
//             {...register('gender', { required: 'Gender is required' })}
//             className="border p-2 w-full"
//           >
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Others">Others</option>
//           </select>
//           {serverError.gender && <p className="text-red-500">{serverError.gender.message}</p>}
//           {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
//         </div>

//         <div className='text-white' >
//           <label>Course</label>
//           <input
//             type="text"
//             {...register('course', { required: 'Course is required' })}
//             className="border p-2 w-full"
//           />
//           {errors.course && <p className="text-red-500">{errors.course.message}</p>}
//         </div>

//         <div className='text-white' >
//           <label>Image</label>
//           <input
//             type="text"
//             {...register('image')}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className='text-white' >
//           {/* <label>Active</label> */}
//           <input
//             type="checkbox"
//             {...register('active')}
//             className="mr-2"
//           />
//           Active
//         </div>

//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Update Employee
//         </button>
//       </form>
//     </div>


// import React, { useState, useEffect } from 'react';
// import { useForm } from "react-hook-form";
// import { useParams } from 'react-router-dom'; // To get the employeeId from the URL
// import axios from 'axios';

// const UpdateEmployee = () => {
//     const [imagePreview, setImagePreview] = useState(null); // State to hold image preview
//     const [employeeData, setEmployeeData] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         designation: "",
//         gender: "",
//         course: "",
//         image: "",
//         active: true,
//     }); // State to hold current employee data
//     const { _id } = useParams(); 

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm();

//     // Fetch employee data for the given employeeId and pre-fill the form
//     useEffect(() => {
//         const fetchEmployeeData = async () => {
//             try { 
//                     if (!_id) {
//                       throw new Error('Employee ID is not provided');
//                     }

//                 const response = await axios.get(`http://localhost:4001/employees/updateEmployee/${id}`);

//                 if (response.data && response.data.employee) {
//                 setEmployee(response.data.employee); 
//                 }            

//                 // const data = response.data;
//                 // console.log(data);
//                 // setEmployeeData(data);

//                 // // Set form values based on fetched data
//                 // setValue('name', data.name);
//                 // setValue('email', data.email);
//                 // setValue('mobile', data.mobile);
//                 // setValue('designation', data.designation);
//                 // setValue('gender', data.gender);
//                 // setValue('course', data.course);
//                 // setImagePreview(`http://localhost:4001/${data.image}`); // Set the current image as preview
//             } catch (error) {
//                 console.error('Error fetching employee data:', error);
//             }
//         };

//         if (_id) {
//             fetchEmployeeData();
//         }
//     }, [_id]);

//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData();
//             formData.append('name', data.name);
//             formData.append('email', data.email);
//             formData.append('mobile', data.mobile);
//             formData.append('designation', data.designation);
//             formData.append('gender', data.gender);
//             formData.append('course', data.course);

//             if (data.image[0]) {
//                 formData.append('image', data.image[0]); // Append new image if uploaded
//             }

//             // Send PUT request to update the employee data
//             const response = await axios.post(`http://localhost:4001/employees/updateEmployee/${employee._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Employee updated successfully:', response.data);
//         } catch (error) {
//             console.error('Error updating employee:', error);
//         }
//     };

//     // Function to handle image change and set preview
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImagePreview(URL.createObjectURL(file)); // Create image preview URL
//         }
//     };

//     if (!employeeData) {
//         return <p>Loading...</p>; // Show loading state while fetching data
//     }

//     return (
//         <div className='w-screen h-screen bg-zinc-800'>
//             <button>Back</button>
//             <div className='h-[90%] rounded-md text-white flex justify-center items-center px-6 py-4'>
//                 <form onSubmit={handleSubmit(onSubmit)} className='my-2 px-10 py-8 rounded-md border border-spacing-3' encType='multipart/form-data'>

//                     <h1 className='text-center text-2xl' >Update Employees Details</h1>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="text"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Name"
//                             value={employeeData.name}
//                             {...register("name", { required: true })}
//                         />
//                         {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="email"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Email"
//                             {...register("email", { required: true })}
//                         />
//                         {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="text"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Mobile"
//                             {...register("mobile", { required: true })}
//                         />
//                         {errors.mobile && <span className="text-red-500 text-sm">Mobile number is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("designation", { required: true })}
//                         >
//                             <option value="" disabled>Select Designation</option>
//                             <option value="HR">HR</option>
//                             <option value="Manager">Manager</option>
//                             <option value="sales">Sales</option>
//                         </select>
//                         {errors.designation && <span className="text-red-500 text-sm">Designation is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("gender", { required: true })}
//                         >
//                             <option value="" disabled>Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Others">Others</option>
//                         </select>
//                         {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("course", { required: true })}
//                         >
//                             <option value="" disabled>Select Course</option>
//                             <option value="MCA">MCA</option>
//                             <option value="BCA">BCA</option>
//                             <option value="BSC">BSC</option>
//                         </select>
//                         {errors.course && <span className="text-red-500 text-sm">Course is required</span>}
//                     </label>

//                     {/* Image Upload Field */}
//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="file"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("image")}
//                             onChange={handleImageChange} // Handle image preview
//                         />
//                         {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
//                     </label>

//                     {/* Image Preview Section */}
//                     {imagePreview && (
//                         <div className="mt-4 ">
//                             <h4 className="text-white mb-2 ">Image Preview:</h4>
//                             <img
//                                 src={imagePreview}
//                                 alt="Preview"
//                                 className="w-40 h-40 object-cover rounded-lg mx-auto"
//                             />
//                         </div>
//                     )}

//                     <div className='flex justify-center items-center gap-5 mt-4'>
//                         <button type="submit" className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
//                             Update
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateEmployee;











// import React, { useState, useEffect } from 'react';
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
// import axios from 'axios';

// const UpdateEmployee = () => {
//     const [imagePreview, setImagePreview] = useState(null); // State for image preview
//     const [employeeData, setEmployeeData] = useState(null); // State for employee data
//     const { _id } = useParams(); // Getting the employee ID from the URL
//     const navigate = useNavigate(); // For navigating after update

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm();

//     // Fetch employee data for the given employeeId and pre-fill the form
//     useEffect(() => {
//         const fetchEmployeeData = async () => {
//             try {
//                 if (!_id) {
//                     throw new Error('Employee ID is not provided');
//                 }
//                 const response = await axios.get(`http://localhost:4001/employees/updateEmployee/${_id}`);
//                 const data = response.data.employee; // Adjust to access `employee` field in response
//                 console.log(data);
//                 setEmployeeData(data);

//                 // Set form values based on fetched data
//                 setValue('name', data.name);
//                 setValue('email', data.email);
//                 setValue('mobile', data.mobile);
//                 setValue('designation', data.designation);
//                 setValue('gender', data.gender);
//                 setValue('course', data.course);
//                 setImagePreview(`http://localhost:4001/${data.image}`); // Set the current image as preview
//             } catch (error) {
//                 console.error('Error fetching employee data:', error);
//             }
//         };

//         if (_id) {
//             fetchEmployeeData();
//         }
//     }, [_id, setValue]);

//     // Handle form submission
//     const onSubmit = async (data) => {
//         try {
//             const formData = new FormData();
//             formData.append('name', data.name);
//             formData.append('email', data.email);
//             formData.append('mobile', data.mobile);
//             formData.append('designation', data.designation);
//             formData.append('gender', data.gender);
//             formData.append('course', data.course);

//             // Append new image if uploaded
//             if (data.image[0]) {
//                 formData.append('image', data.image[0]);
//             }

//             // Update the employee details
//             const response = await axios.post(`http://localhost:4001/employees/updateEmployee/${_id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log('Employee updated successfully:', response.data);
//             navigate("/employees"); // Redirect to employee list after update
//         } catch (error) {
//             console.error('Error updating employee:', error);
//         }
//     };

//     // Handle image change and set preview
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImagePreview(URL.createObjectURL(file)); // Create image preview URL
//         }
//     };

//     // Show loading state while fetching data
//     if (!employeeData) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className='w-screen h-screen bg-zinc-800'>
//             <button onClick={() => navigate("/employees")}>Back</button>
//             <div className='h-[90%] rounded-md text-white flex justify-center items-center px-6 py-4'>
//                 <form onSubmit={handleSubmit(onSubmit)} className='my-2 px-10 py-8 rounded-md border border-spacing-3' encType='multipart/form-data'>
//                     <h1 className='text-center text-2xl'>Update Employees Details</h1>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="text"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Name"
//                             {...register("name", { required: true })}
//                         />
//                         {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="email"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Email"
//                             {...register("email", { required: true })}
//                         />
//                         {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="text"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             placeholder="Mobile"
//                             {...register("mobile", { required: true })}
//                         />
//                         {errors.mobile && <span className="text-red-500 text-sm">Mobile number is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("designation", { required: true })}
//                         >
//                             <option value="" disabled>Select Designation</option>
//                             <option value="HR">HR</option>
//                             <option value="Manager">Manager</option>
//                             <option value="Sales">Sales</option>
//                         </select>
//                         {errors.designation && <span className="text-red-500 text-sm">Designation is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("gender", { required: true })}
//                         >
//                             <option value="" disabled>Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Others">Others</option>
//                         </select>
//                         {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
//                     </label>

//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <select
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("course", { required: true })}
//                         >
//                             <option value="" disabled>Select Course</option>
//                             <option value="MCA">MCA</option>
//                             <option value="BCA">BCA</option>
//                             <option value="BSC">BSC</option>
//                         </select>
//                         {errors.course && <span className="text-red-500 text-sm">Course is required</span>}
//                     </label>

//                     {/* Image Upload Field */}
//                     <label className="input input-bordered flex items-center gap-2 mt-5 mb-1">
//                         <input
//                             type="file"
//                             className="grow text-white bg-zinc-700 rounded-lg p-2 outline-none"
//                             {...register("image")}
//                             onChange={handleImageChange}
//                         />
//                         {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
//                     </label>

//                     {/* Image Preview Section */}
//                     {imagePreview && (
//                         <div className="mt-4 ">
//                             <h4 className="text-white mb-2 ">Image Preview:</h4>
//                             <img
//                                 src={imagePreview}
//                                 alt="Preview"
//                                 className="w-40 h-40 object-cover rounded-lg mx-auto"
//                             />
//                         </div>
//                     )}

//                     <div className='flex justify-center items-center gap-5 mt-4'>
//                         <button type="submit" className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800 border-0 p-2'>
//                             Update
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UpdateEmployee;








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateEmployee = () => {
//   const { id } = useParams(); // Get employee ID from URL
//   const navigate = useNavigate();
  
//   // State to hold the employee details
//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     designation: "",
//     gender: "",
//     course: "",
//     image: "",
//     active: true,
//   });
  
//   // Fetch the employee details on component mount
//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/employees/updateEmployee/${id}`);
//         if (response.data && response.data.employee) {
//           setEmployee(response.data.employee); // Set employee data in state
//         }
//       } catch (error) {
//         console.error("Error fetching employee details:", error);
//       }
//     };

//     fetchEmployee();
//   }, [id]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({
//       ...employee,
//       [name]: value,
//     });
//   };

//   // Handle form submission to update employee data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`http://localhost:4001/employees/updateEmployee/${id}`, employee);
//       navigate("/employeesDetails"); // Redirect to employees list after successful update
//     } catch (error) {
//       console.error("Error updating employee:", error);
//     }
//   };

//   return (
//     <div className="w-[80%] m-auto">
//       <h2 className="text-2xl font-bold">Update Employee</h2>

//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={employee.name}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={employee.email}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Mobile</label>
//           <input
//             type="text"
//             name="mobile"
//             value={employee.mobile}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Designation</label>
//           <input
//             type="text"
//             name="designation"
//             value={employee.designation}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Gender</label>
//           <select
//             name="gender"
//             value={employee.gender}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           >
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         <div>
//           <label>Course</label>
//           <input
//             type="text"
//             name="course"
//             value={employee.course}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Image</label>
//           <input
//             type="text"
//             name="image"
//             value={employee.image}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div>
//           <label>Active</label>
//           <input
//             type="checkbox"
//             name="active"
//             checked={employee.active}
//             onChange={(e) => setEmployee({ ...employee, active: e.target.checked })}
//             className="mr-2"
//           />
//           Active
//         </div>

//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Update Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateEmployee;




import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const cookieUser = Cookies.get("jwt");
        const localUser = localStorage.getItem("EMS");
        if (cookieUser || localUser) {
            setAuthUser(JSON.parse(localUser || cookieUser));
        }
    }, []);

    const login = (user) => {
        setAuthUser(user);
        localStorage.setItem("EMS", JSON.stringify(user));
        Cookies.set("jwt", user.token, { expires: 1 }); // adjust expiry as needed
    };

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem("EMS");
        Cookies.remove("jwt");
    };

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
