import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { useLogoutMutation } from '../../app/api/ApiSlice';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearAllLists } from '../../app/ListSlice/ListSlice';

function Navbar() {
    const [logoutCall, { isLoading, isError, error }] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await logoutCall().unwrap();
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
            dispatch(clearAllLists());
        } catch (error) {
            toast.error(response.data.message, {
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
    }
    return (
        <div className='flex z-10  bg-[#1B1B2F] text-white w-screen h-1/14 top-0 sticky items-center  '>
            <div className='flex w-[90%] items-center '>
                <div className='w-19 h-full items-center flex'>
                    <img className='h-[90%] w-13' src="/icon.png" alt="" />
                </div>
                <div className='font-bold text-lg'>ShopiList</div>
            </div>
            <div className='text-xl hover:scale-110 hover:bg-gray-600 rounded-full p-2 transition-all' onClick={async () => await handleLogout()}>
                <IoLogOutOutline />
            </div>
        </div>
    )
}

export default Navbar
