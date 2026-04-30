const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { listNotes, createNote } = require("../controllers/notes.controller");

const router = express.Router();

router.get("/", requireAuth, listNotes);
router.post("/", requireAuth, createNote);

module.exports = router;

