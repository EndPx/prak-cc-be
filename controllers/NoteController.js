const Note = require("../models/NoteModel.js");

// GET
async function getNotes(req, res) {
  try {
    const notes = await Note.findAll({ where: { userId: req.user.id } });
    res.json(notes);
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Gagal mengambil catatan.",
    });
  }
}

// CREATE
async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      const error = new Error("Judul dan konten tidak boleh kosong.");
      error.statusCode = 400;
      throw error;
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message || "Gagal menyimpan catatan. Silakan coba lagi.",
    });
  }
}

const updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note || note.userId !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    const { title, content } = req.body;
    if (!title || !content) {
      const error = new Error("Judul dan konten tidak boleh kosong.");
      error.statusCode = 400;
      throw error;
    }

    await note.update({ title, content });
    res.json({ message: "Catatan berhasil diperbarui" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message || "Gagal menyimpan catatan. Silakan coba lagi.",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note || note.userId !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    await note.destroy();
    res.json({ message: "Catatan berhasil dihapus" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message || "Gagal menghapus catatan. Silakan coba lagi.",
    });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
