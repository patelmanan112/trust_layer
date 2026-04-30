const { Note } = require("../models/Note");

async function listNotes(req, res, next) {
  try {
    const userId = req.user.sub;
    const notes = await Note.find({ userId }).sort({ createdAt: -1 }).limit(20);
    return res.json({
      notes: notes.map((n) => ({
        id: n._id.toString(),
        title: n.title,
        body: n.body,
        createdAt: n.createdAt,
      })),
    });
  } catch (e) {
    return next(e);
  }
}

async function createNote(req, res, next) {
  try {
    const userId = req.user.sub;
    const { title, body } = req.body || {};
    if (!title || typeof title !== "string") {
      const err = new Error("title is required");
      err.statusCode = 400;
      throw err;
    }
    const note = await Note.create({
      userId,
      title: title.trim(),
      body: typeof body === "string" ? body.trim() : "",
    });
    return res.status(201).json({
      note: {
        id: note._id.toString(),
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
      },
    });
  } catch (e) {
    return next(e);
  }
}

module.exports = { listNotes, createNote };

