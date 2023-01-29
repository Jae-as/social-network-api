const router = require("express").Router();
const {
  addFriend,
  createNewUser,
  deleteFriend,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserInfo,
} = require("../../controllers/usersController");

router.route("/").get(getAllUsers).post(createNewUser);

router
  .route("/:userId")
  .get(updateUserInfo)
  .put(getSingleUser)
  .delete(deleteUser);

router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

// router.get("/", getAllUsers);
// router.post("/", createNewUser);
// router.put("/:userId", updateUserInfo);
// router.get("/:userId", getSingleUser);
// router.delete("/:userId", deleteUser);
// router.put("/:userId/friends/:friendId", addFriend);
// router.delete("/:userId/friends/:friendId", deleteFriend);

module.exports = router;
