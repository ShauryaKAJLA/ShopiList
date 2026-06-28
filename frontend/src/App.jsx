import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import { useGetAllListsQuery } from './app/api/ApiSlice.js';
import { storeData } from './app/ListSlice/ListSlice.js';
import { useDispatch } from 'react-redux';
import Loading from './components/Loading/Loading.jsx';
function App() {
  const { data: dataLists, error: errorLists, isError: isErrorLists, isLoading: isLoadingLists } = useGetAllListsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

    const isLogged = localStorage.getItem("isAuthenticated")
    if (isLogged === undefined) {
      setTimeout(() => {
        navigate('/')
      })
    }
  }, [])
  useEffect(() => {
    dispatch(storeData(dataLists?.data))
    console.log(dataLists)
    if (isErrorLists) {
      console.log(errorLists)
    }
  }, [dataLists, errorLists, isErrorLists])
  return (
    <div className='w-screen h-screen overflow-x-hidden bg-[#F7F6F2] font-sans'>
      <Navbar />
      {isLoadingLists ? < Loading /> :
        <Outlet />
      }
    </div>
  )
}

export default App;
