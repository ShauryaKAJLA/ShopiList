import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ListItem from '../../components/ListItem/ListItem';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import { addNewItem } from '../../app/ListSlice/ListSlice';
import { useAddNewListItemMutation } from '../../app/api/ApiSlice';
import { Bounce, toast } from 'react-toastify';


function ListInfo() {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const data = (useSelector(state => state.Lists.allLists))?.filter(item => item._id == listId)[0]
    const list = data?.items
    const complete = parseInt((data?.listItemsBought / data?.listTotalItems) * 100) + '%';
    const [newItem, setNewItem] = useState({ itemName: "", itemQnt: "" });
    const [addNewListApi, { isLoading, isError, error }] = useAddNewListItemMutation();
    const changeItemName = (e) => {
        setNewItem(item => ({ ...item, itemName: e.target.value }))
    }
    const changeItemQnt = (e) => {
        setNewItem(item => ({ ...item, itemQnt: e.target.value }))
    }
    const addNew = async () => {
        try {
            const response = await addNewListApi({ _id: listId, listItem: { name: newItem.itemName, quantity: newItem.itemQnt, isBought: false } }).unwrap();
            console.log(response)
            console.log(error)
            if (response) {
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
                dispatch(addNewItem({ newItem: { name: newItem.itemName, quantity: newItem.itemQnt, isBought: false }, listId }))
                setNewItem({ itemName: "", itemQnt: "" })
            }

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
    }
    return (
        <div className='flex flex-col pb-3 w-full justify-center items-center'>
            <div className='py-10 w-[90%] flex flex-col gap-3'>
                <div className='text-3xl font-bold'>
                    <Link to={'/lists'}>
                        < IoMdArrowRoundBack />

                    </Link >
                    {data?.listName}
                </div>
                <div className='w-[90%] flex justify-between  items-center'>
                    <div className='flex gap-4 text-sm w  font-mono font-extrabold text-olive-500'>{data?.listItemsBought} of {data?.listTotalItems} done <span className='text-green-500'>{complete}</span></div>
                    <div className='w-1/3'>
                        <div className="w-full h-2 rounded-2xl bg-gray-200">
                            <div style={{ width: complete, backgroundColor: data?.color }} className="h-2 bg-amber-500 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
                <div className=' w-[65%] sm:w-[30%] md:w-[15%]'>
                    <div className='flex gap-4   font-mono font-extrabold text-olive-500'>
                        Add new Item
                    </div>
                    <div>
                        <input value={newItem.itemName} onChange={(e) => changeItemName(e)} className='border hover:scale-110 transition-all border-gray-300 rounded-2xl flex placeholder:text-center bg-white shadow m-2 p-1' type="text" placeholder='Item Name' />
                    </div>
                    <div>
                        <input value={newItem.itemQnt} onChange={(e) => changeItemQnt(e)} className='border hover:scale-110 transition-all border-gray-300 rounded-2xl flex placeholder:text-center bg-white shadow m-2 p-1' type="text" placeholder='Item Quantity' />
                    </div>
                    <div onClick={async () => await addNew()} style={{ backgroundColor: data?.color || "blueviolet" }} className='text-3xl hover:scale-110 transition-all w-[30%] rounded-2xl  justify-center p-1  flex items-center'>
                        <IoIosAddCircleOutline className='text-white' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3 w-[90%]'>
                {
                    list?.map((item, index) => (!item.isBought &&
                        <div className='flex bg-white shadow rounded-2xl  w-full h-20 items-center'>
                            <div style={{ borderColor: data?.color }} className='h-[70%] border-2 rounded-2xl '></div>
                            <ListItem data={{ ...item, color: data?.color, index, listId: data?._id }} />
                        </div>
                    ))
                }
            </div>
            {(list?.filter(item => item.isBought).length) ? <div className="relative flex py-5  w-[90%] items-center">
                <div className="grow border-t border-gray-300"></div>
                <span className="shrink mx-4 text-gray-400 text-sm font-sans">Done ({data.listItemsBought})</span>
                <div className="grow border-t border-gray-300"></div>
            </div> : <></>}
            <div className='flex flex-col gap-3 w-[90%]'>
                {
                    list?.map((item, index) => (item.isBought &&
                        <div className='flex bg-white shadow rounded-2xl  w-full h-20 items-center'>
                            <div style={{ borderColor: data?.color }} className='h-[70%] border-2 rounded-2xl '></div>
                            <ListItem data={{ _id: index, ...item, color: data?.color, index, listId: data?._id }} />
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default ListInfo
