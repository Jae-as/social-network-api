import express from "express";
import { addFriend, createNewUser, deleteFriend, deleteUser, getAllUsers, getSingleUser, updateUserInfo } from "../controllers/usersController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createNewUser);
router.put("/:userId", updateUserInfo);
router.get("/:userId", getSingleUser);
router.delete("/:userId", deleteUser);
router.put("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", deleteFriend);


export default router;
