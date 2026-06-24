import { createSlice, current } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
// {
//     _id,
//     listName,
//     listTotalItems,
//     listItemsBought,
//     color,
//     icon,
//     items:{
//     name,
//    quantity
//     isBought,
//     }
// }
const initialState = {
    allLists: null
}

export const ListSlice = createSlice({
    name: "ListSlice",
    initialState,
    reducers: {
        storeData: (state, action) => {
            state.allLists = action.payload
        },
        addNewItem: (state, action) => {
            const ind = state.allLists.findIndex(item => item._id === action.payload.listId)
            state.allLists[ind].items.push(action.payload.newItem)
            state.allLists[ind].listTotalItems++;
        },
        removeItem: (state, action) => {
            const ind = state.allLists.findIndex(item => item._id === action.payload.listId)
            state.allLists[ind].items = state.allLists[ind].items.filter((_, index) => index != action.payload.itemId)
            state.allLists[ind].listTotalItems--;
            if (action.payload.isBought)
                state.allLists[ind].listItemsBought--;
        },
        itemToggle: (state, action) => {
            const ind = state.allLists.findIndex(item => item._id == action.payload.listId)
            state.allLists[ind].listItemsBought += (state.allLists[ind].items[action.payload.itemIndex].isBought ? -1 : 1);
            state.allLists[ind].items[action.payload.itemIndex].isBought = state.allLists[ind].items[action.payload.itemIndex].isBought ? false : true;
        },
        addNewList: (state, action) => {
            const newItem = {
                _id: uuid(),
                listName: action.payload.listName,
                listTotalItems: 0,
                listItemsBought: 0,
                color: action.payload.colors,
                items: []
            }
            state.allLists.push(newItem);
        },
        deleteList: (state, action) => {
            state.allLists = state.allLists.filter(item => item._id !== action.payload.listId)
        }
    }
})


export const { storeData, addNewItem, removeItem, itemToggle, addNewList, deleteList } = ListSlice.actions;
export default ListSlice.reducer