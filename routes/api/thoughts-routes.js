import express from "express";
import { createNewThought, createReaction, deleteReaction, deleteThought, getAllReactions, getAllThoughts, getThought, updateThought } from "../controllers/thoughtsController";


const router = express.Router();

router.get("/", getAllThoughts);
router.post("/", createNewThought);
router.get("/:thoughtId", getThought);
router.put("/:thoughtId", updateThought);
router.delete("/:thoughtId", deleteThought);
router.get("/:thoughtId/reactions", getAllReactions);
router.post("/:thoughtId/reactions", createReaction);
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

export default router;