import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../app/api/ApiSlice.js'
import { Bounce, toast } from 'react-toastify'
function Login() {
    useEffect(() => {
        const navigate = useNavigate()
        if (localStorage.getItem("isAuthenticated")) {
            navigate("/lists")
        }
    }, [])
    console.log(import.meta.env.VITE_SERVER)
    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    useEffect(() => {
        const isLogged = localStorage.getItem("isAuthenticated") === true
        if (isLogged) {
            setTimeout(() => {
                navigate('/lists')
            }, 3000)
        }

    })
    const [login, { isLoading, isError, error }] = useLoginMutation();

    const handleLogin = async () => {
        if (user.username === "" || user.password === "") return;
        try {
            const response = await login(user).unwrap();
            // after successful login API call
            localStorage.setItem('isAuthenticated', 'true');
            console.log(response);
            const { accessToken } = response.data
            localStorage.setItem("accessToken", accessToken)
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
            navigate('/lists')
        } catch (err) {
            console.log(err);
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
                <h2 className='text-3xl font-bold '>Login</h2>
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
                <button className='shadow-lg hover:scale-105 transition-all bg-blue-500 text-white p-3 rounded-md  w-1/2' onClick={handleLogin}>Login</button>
                <div>Don't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>Sign up</Link></div>
            </div>
        </div>
    )
}

export default Login
