import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { itemToggle, removeItem } from '../../app/ListSlice/ListSlice';
import { Bounce, toast } from 'react-toastify';
import { useRemoveListItemMutation, useToggleIsBoughtMutation } from '../../app/api/ApiSlice';

function ListItem({ data }) {
    const dispatch = useDispatch();
    const [deleteItemApi, { isError, isLoading, error }] = useRemoveListItemMutation();
    const [toggleIsBoughtApi, { isError: toggleError, isLoading: toggleLoading }] = useToggleIsBoughtMutation();
    const toggleChange = async () => {
        try {
            const response = await toggleIsBoughtApi({ _id: data.listId, index: data.index }).unwrap();
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
            dispatch(itemToggle({ listId: data.listId, itemIndex: data.index }))
        } catch (error) {
            toast.error(error.data.message, {
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
    const deleteItem = async () => {
        try {
            const response = await deleteItemApi({ _id: data.listId, index: data.index }).unwrap();
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
            dispatch(removeItem({ listId: data.listId, itemId: data.index }))
        } catch (error) {
            toast.error(error.data.message, {
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
        <div className="group flex h-full w-full items-center justify-between px-5 ">
            <div className="flex gap-4">
                <div className="flex justify-center items-center ">
                    <input type="checkbox" style={{ backgroundColor: data.isBought ? data.color : "white" }} className={`appearance-none w-4 h-4 border rounded-full border-b-gray-900 opacity-60 `} name="" id="" checked={data.isBought} onChange={async () => await toggleChange()} />
                </div>

                <div>
                    <div className="flex  font-bold">{data.name}</div>
                    <div className="text-sm text-olive-500">{data.quantity}</div>
                </div>
            </div>

            {/* Icon is hidden by default, and becomes visible when the parent container is hovered */}
            <div className="text-olive-500 opacity-0  transition-opacity group-hover:opacity-100 cursor-pointer" onClick={async () => await deleteItem()}>
                <MdDeleteOutline size={20} />
            </div>
        </div>
    );
}

export default ListItem;
