import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteList } from "../../app/ListSlice/ListSlice.js";
import { useDeleteListMutation } from "../../app/api/ApiSlice.js";
import { Bounce, toast } from "react-toastify";

function Lists({ data }) {
    let complete = parseInt((data.listItemsBought / data.listTotalItems) * 100) + '%';
    const [deleteListApi, { isError, isLoading, error }] = useDeleteListMutation();
    console.log(data);
    const dispatch = useDispatch();
    const triggerDelete = async (e) => {
        try {

            e.preventDefault();
            e.stopPropagation();
            const response = await deleteListApi({ _id: data._id }).unwrap();
            if (response) {
                dispatch(deleteList({ listId: data._id }))
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
            }
        }
        catch (error) {
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
        <Link to={`/list/${data._id}`}>
            <div className="sm:w-80 z-1 group hover:-translate-y-0.5 relative transition-transform w-full  min-h-47.5 rounded-2xl flex flex-col justify-around items-center  border-t-10 bg-white shadow " style={{ borderColor: data.color }}>
                <div className="flex w-[90%] gap-2  h-12.5 items-center">
                    <div className={`h-full flex justify-center items-center w-15 rounded-2xl text-3xl `} style={{ backgroundColor: data.color }}>
                    </div>
                    <div className="flex items-center  w-full justify-between">
                        <div>
                            <div className="font-bold text-xl">{data.listName}</div>
                            <div className="text-xs  font-mono font-extrabold text-olive-400">{data.listTotalItems - data.listItemsBought} items left</div>
                        </div>
                        <div onClick={async (e) => await triggerDelete(e)} className="sm:opacity-0  z-50 hover:text-red-600  bg-gray-300 p-2 rounded-full transition-opacity group-hover:opacity-40">
                            <MdOutlineDelete />
                        </div>
                    </div>
                </div>
                <div className="w-[90%]  ">
                    <div>
                        <div className="w-full h-2 rounded-2xl bg-gray-200">
                            <div style={{ width: complete, backgroundColor: data.color }} className={`h-2 bg-amber-500 rounded-2xl`}></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs  font-mono font-extrabold text-olive-400">
                        <div>{data.listItemsBought} done</div>
                        <div>{data.listTotalItems} total</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Lists;