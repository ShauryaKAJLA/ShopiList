import mongoose from "mongoose";
import { List } from "../models/list.model.js";
import ApiError from "../utils/ApiError.util.js";
import { asyncHandler } from "../utils/AsyncHandler.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import { application } from "express";
import { User } from "../models/user.model.js";

const createNewList = asyncHandler(async (req, res) => {
    const { newList } = req.body;
    if (!newList) {
        throw new ApiError(400, "Data for new list is required")
    }
    const { listName } = newList;
    if (!listName) {
        throw new ApiError(400, "List name is required")
    }
    const listTotalItems = newList.listTotalItems || 0;
    const listItemsBought = newList.listTotalItems || 0;
    const color = newList.color || "#F68A3C";
    const items = [];

    const newListFet = await List.create({
        createdBy: new mongoose.Schema.Types.ObjectId(req.user?._id),
        listName,
        listTotalItems,
        listItemsBought,
        color,
        items
    })

    if (!newListFet) {
        throw new ApiError(500, "Error while creating new list")
    }
    return res.status(200).json(new ApiResponse(newListFet, 200, "List created Successfully"))
})

const deleteList = asyncHandler(async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        throw new ApiError(400, "Id is required")
    }
    const deletedList = await List.findByIdAndDelete(new mongoose.Schema.Types.ObjectId(_id));
    if (!deleteList) {
        throw new ApiError(400, "No List found with this id")
    }
    return res.status(200).json(new ApiResponse(deletedList, 200, "List deleted successfully"))
})

const updateListName = asyncHandler(async (req, res) => {
    const { _id, listName } = req.body;
    if (!_id || !listName) {
        throw new ApiError(400, "list id and new list name is required")
    }
    const newList = await List.findByIdAndUpdate(new mongoose.Schema.Types.ObjectId(_id), {
        $set: {
            listName
        }
    })
    return res.status(200).json(new ApiResponse(newList, 200, "List name updated successfully"))
})

const addNewListItem = asyncHandler(async (req, res) => {
    const { _id, listItem } = req.body;
    if (!_id || !listItem) {
        throw new ApiError(400, "list id and new list item is required")
    }
    if (!listItem?.name || !listItem?.quantity || !listItem?.isBought) {
        throw new ApiError(400, "New list Item data is not complete")
    }
    const list = await List.findById(new mongoose.Schema.Types.ObjectId(_id))
    if (!list) {
        throw new ApiError(500, "Unable to find list with given id")
    }
    list.items.push(listItem)
    await list.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(listItem, 200, "Updated list added new list item"))
})

const removeListItem = asyncHandler(async (req, res) => {
    const { _id, index } = req.body;
    if (!_id || !index) {
        throw new ApiError(400, "list id and index is required")
    }
    const list = await List.findById(new mongoose.Schema.Types.ObjectId(_id))
    if (!list) {
        throw new ApiError(500, "Unable to find list with given id")
    }
    list.items = list.items.filter((_, ind) => ind !== index)
    await list.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(listItem, 200, "Updated list removed list item"))
})


const getAllListItems = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    let allLists = await List.find({ createdBy: userId })
    allLists = allLists.map(list => {
        const listTotalItems = list.items.length
        const listItemsBought = list.items.filter(item => item.isBought).length
        return { ...list, listTotalItems, listItemsBought }
    })
    return res.status(200).json(new ApiResponse(allLists, 200, "Successfully returned all lists"))
})
const setListItemBoughtStatus = asyncHandler(async (req, res) => {
    const { _id, index, isBought } = req.body;
    if (!_id || !index || isBought === undefined) {
        throw new ApiError(400, "list id, index and isBought status is required")
    }
    const List = await List.findById(new mongoose.Schema.Types.ObjectId(_id))
    if (!List) {
        throw new ApiError(500, "Unable to find list with given id")
    }
    List.items[index].isBought = isBought
    await List.save({ validateBeforeSave: false });
    return res.status(200).json(new ApiResponse(List.items[index], 200, "Updated list item bought status"))
})

export { createNewList, deleteList, updateListName, addNewListItem, removeListItem, getAllListItems, setListItemBoughtStatus }