const router = require("express").Router();
const {
  createNewThought,
  createReaction,
  deleteReaction,
  deleteThought,
  getAllReactions,
  getAllThoughts,
  getThought,
  updateThought,
} = require("../../controllers/thoughtsController");

router.route("/").get(getAllThoughts).post(createNewThought);

router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").get(getAllReactions).post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// router.get("/", getAllThoughts);
// router.post("/", createNewThought);
// router.get("/:thoughtId", getThought);
// router.put("/:thoughtId", updateThought);
// router.delete("/:thoughtId", deleteThought);
// router.get("/:thoughtId/reactions", getAllReactions);
// router.post("/:thoughtId/reactions", createReaction);
// router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
