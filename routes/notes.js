const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET Route
notes.get("/", (req, res) => {
  readFromFile("db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE Route
// "/:id" to indicate it's just one note
notes.delete("/:id", (req, res) => {
  const noteID = reg.params.id;
  readFromFile("db/db.json").then((note) => {
    note.filter((note) => note.id !== noteID);
    writeFile(notes, "db/db.json");
  });
});

module.exports = notes;
