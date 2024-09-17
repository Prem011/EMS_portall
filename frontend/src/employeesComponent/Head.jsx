import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { useState } from 'react';

const Head = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem('EMS');
        if (userData) {
            const user = JSON.parse(userData);
            setUsername(user?.username || "User : Admin");
        }
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post('/api/user/logout');
            logout(); 
            navigate('/login'); 
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className='w-full h-[8%] bg-zinc-600 flex text-white px-[2%] gap-[30%]'>
            <div className='w-[80%] h-full flex items-center gap-[2%]'>
                <Link to={"/"} className='w-[10%] h-[80%] my-auto flex flex-col justify-center items-center bg-zinc-400 mx-5 py-2 rounded-2xl shadow-lg shadow-zinc-700/200'>
                    <img width="50" height="50" src="https://img.icons8.com/dotty/80/employee-card.png" alt="employee-card" />
                </Link>

                <div className='w-full h-full flex items-center gap-[7%]'>
                    <Link to={"/"} className='text-xl hover:text-zinc-300'>Home</Link>
                    <Link to={"/employeesDetails"} className='text-xl hover:text-zinc-300'>Employees List</Link>
                </div>
            </div>

            <div className='w-[40%] h-full flex justify-between items-center'>
                <h1 className='text-2xl inline-block'>
                    <img className='inline w-5 mr-2' src="https://img.icons8.com/material/24/40C057/sphere--v1.png" alt="" />
                    {username}
                </h1>
                <button onClick={handleLogout} className='bg-red-600 hover:bg-red-500 px-3 py-2 rounded-lg text-md'>Logout</button>
            </div>
        </div>
    );
}

export default Head;
