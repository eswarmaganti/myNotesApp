import express from "express";
import {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getANotes,
} from "../controllers/notesController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .get("/", protect, getAllNotes)
  .get("/:id", protect, getANotes)
  .post("/", protect, createNotes)
  .patch("/:id", protect, updateNotes)
  .delete("/:id", protect, deleteNotes);

export default router;
