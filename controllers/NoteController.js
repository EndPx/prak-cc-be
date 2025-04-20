const Note = require ("../models/NoteModel.js");

// GET
async function getNotes(req, res) {
  try {
    const notes = await Note.findAll({ where: { userId: req.user.uid } });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// CREATE
async function createNote(req, res) {
  try {
    const {title, content} = req.body;
    const note = await Note.create({ 
      title: title,
      content: content,
      userId: req.user.uid 
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note || note.userId !== req.user.uid) return res.status(403).json({ message: "Not authorized" });
    await note.update(req.body);
    res.json({ message: "Note updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note || note.userId !== req.user.uid) return res.status(403).json({ message: "Not authorized" });
    await note.destroy();
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {getNotes, createNote, updateNote, deleteNote};
