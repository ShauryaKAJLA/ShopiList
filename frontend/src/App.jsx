import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
function App() {
  return (
    <div className='w-screen h-screen overflow-x-hidden bg-[#F7F6F2] font-sans'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App;
