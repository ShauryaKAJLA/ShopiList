import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNewListItem, createNewList, deleteList, getAllListItems, removeListItem, setListItemBoughtStatus, updateListName } from "../controllers/list.controller.js";


const router = Router();

router.route("/createNewList").post(verifyJWT, createNewList);
router.route("/deleteList").post(verifyJWT, deleteList);
router.route("/updateListName").put(verifyJWT, updateListName);
router.route("/addNewListItem").post(verifyJWT, addNewListItem);
router.route("/removeListItem").post(verifyJWT, removeListItem);
router.route("/getAllLists").get(verifyJWT, getAllListItems);
router.route("/setListItemBoughtStatus").put(verifyJWT, setListItemBoughtStatus);

export default router