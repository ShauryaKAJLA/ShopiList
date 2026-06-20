import React from 'react'

function Navbar() {
    return (
        <div className='flex z-10 bg-[#1B1B2F] text-white w-screen h-1/14 top-0 sticky items-center'>
            <div className='w-19 h-full items-center flex'>
                <img className='h-[90%] w-13' src="../../../public/icon.png" alt="" />
            </div>
            <div className='font-bold text-lg'>ShopiList</div>
        </div>
    )
}

export default Navbar
