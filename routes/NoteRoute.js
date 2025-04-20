const express = require( "express");
const { getNotes, createNote, updateNote, deleteNote} = require( "../controllers/NoteController.js");
const {verifyToken} = require( "../middleware/auth.js");

const router = express.Router();

router.get("/notes", verifyToken, getNotes);
router.post("/notes", verifyToken, createNote);
router.put("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);

module.exports = router;
