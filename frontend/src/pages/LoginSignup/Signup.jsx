import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSingupMutation } from '../../app/api/apiSlice';
import { Bounce, toast } from 'react-toastify';

function Signup() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    const [login, { isLoading, isError, error }] = useSingupMutation();
    const navigate = useNavigate()
    const handleSignup = async () => {
        if (user.username === "" || user.password === "") return;
        try {
            const response = await login(user).unwrap();
            toast.success(response.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            navigate('/')
        } catch (err) {
            toast.error(err.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,

                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };
    return (
        <div className=' flex items-center justify-center h-screen w-screen '>
            <div className='flex flex-col  bg-white shadow-2xl items-center justify-evenly   sm:w-1/2 w-[90%] h-1/2 rounded-3xl p-4 '>
                <h2 className='text-3xl font-bold '>Signup</h2>
                <input className='shadow-lg hover:scale-105 transition-all border border-gray-300 rounded-md p-3 w-[95%]'
                    type="text"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input className='shadow-lg hover:scale-105 transition-all border border-gray-300 rounded-md p-3 w-[95%]'
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button className='shadow-lg hover:scale-105 transition-all bg-blue-500 text-white p-3 rounded-md  w-1/2' onClick={handleSignup}>Signup</button>
                <div>Already have an account? <Link to="/" className='text-blue-500 hover:underline'>Login</Link></div>
            </div>
        </div>
    )
}

export default Signup
