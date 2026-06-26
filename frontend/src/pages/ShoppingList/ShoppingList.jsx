import React, { useEffect, useState } from 'react'
import Lists from '../../components/Lists/Lists.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosAdd } from "react-icons/io";
import { addNewList, storeData } from '../../app/ListSlice/ListSlice.js';
import { useAddNewListMutation, useGetAllListsQuery } from '../../app/api/ApiSlice.js';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

function ShoppingList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: dataLists, error: errorLists, isError: isErrorLists, isLoading: isLoadingLists } = useGetAllListsQuery();
    const [addNewListCall, { isLoading, isError, error }] = useAddNewListMutation();
    useEffect(() => {
        const isLogged = document.cookie.includes('isAuthenticated=true')
        if (!isLogged) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
        dispatch(storeData(dataLists?.data))
        console.log(dataLists)
        if (isErrorLists) {
            console.log(errorLists)
        }
    }, [dataLists, errorLists, isErrorLists])
    const allLists = useSelector(state => state.Lists.allLists)
    const [isaddNew, setisAddNew] = useState(true);
    const [colors, setColors] = useState([
        "#FF4757", "#FF6B35", "#FFD930", "#26D0A2", "#00B4D8", "#7C4DFF", "#FF6B9D", "#4CAF50"
    ])
    const [newList, setNewList] = useState({ listName: "", colors: "#FF4757" });
    const triggerListNameChange = (e) => {
        setNewList({ ...newList, listName: e.target.value })
    }
    const triggerListColorChange = (colors) => {
        setNewList({ ...newList, colors: colors })
    }
    const addNew = async () => {
        if (newList.listName !== "") {
            try {
                const response = await addNewListCall(newList).unwrap();
                console.log(response)
                if (response) {
                    dispatch(addNewList(response.data))
                    toast.error(response.message, {
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
                    setNewList({ listName: "", colors: "#FF4757" });
                    setisAddNew(true);
                }
            } catch (err) {
                if (isError) {
                    console.log(error)
                    toast.error(error.message, {
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
        }
    }
    const deleteList = async (listId) => { }
    return (
        <div className="w-screen h-screen  flex flex-col items-center ">
            <div className='py-10 w-[90%] md:w-[65%] '>
                <div className='text-3xl font-bold'>My Shopping List</div>
                <div className='flex justify-between text-sm  font-mono font-extrabold text-olive-500'>{allLists?.length} lists . tap to open</div>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 w-[90%] lg:w-[65%]  pb-9   gap-5 mt-5 items-center'>
                {allLists?.map(item => (<Lists data={item} />
                ))}
                {isaddNew ?
                    <div className="w-full justify-center gap-2 sm:w-80 min-h-47.5 relative z-0 flex flex-col items-center transition-transform hover:-translate-y-0.5 hover:bg-white shadow rounded-2xl outline-dashed outline-2 outline-gray-300 [outline-dasharray:6px_4px] [outline-offset:-1.5px]">
                        <IoIosAdd onClick={() => setisAddNew(false)} className=' text-gray-400 text-5xl bg-gray-200 p-2 rounded-lg' />
                        <div className='text-gray-400 font-semibold text-sm'>New List</div>
                    </div> :
                    <div style={{ border: `2px solid ${newList.colors}` }} className='w-full bg-white  gap-3 p-5 sm:w-80 min-h-47.5 relative z-0 flex flex-col transition-transform hover:-translate-y-0.5 hover:bg-white shadow rounded-2xl border-2 '>
                        <div className='text-sm font-bold'>New list</div>
                        <div>
                            <input type="text" value={newList.listName} onChange={(e) => triggerListNameChange(e)} className='p-1 pl-4 w-full bg-[#F7F6F2] rounded-2xl  shadow' placeholder="List Name..." />
                        </div>
                        <div className='flex gap-1'>
                            {colors.map(item => <div onClick={() => triggerListColorChange(item)} style={{ backgroundColor: item, border: `${newList.colors == item ? "2px solid black" : ""}`, }} className='w-5 h-5 rounded-full hover:scale-110 transition-all'></div>)}
                        </div>
                        <div className='flex justify-between' >
                            <button onClick={async () => await addNew()} style={{ backgroundColor: newList.colors }} className=' rounded-3xl text-white w-[60%] py-2'>
                                create
                            </button>
                            <button onClick={() => setisAddNew(true)} className='hover:cursor-pointer text-neutral-500 text-xs font-semibold rounded-3xl hover:bg-gray-100 w-[30%] py-2'>
                                cancel
                            </button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default ShoppingList