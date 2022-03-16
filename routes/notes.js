const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { 
    readFilePromise, 
    writeToFile, 
    readAndAppend, 
} = require('../helpers/fsHelper');

// GET route for retrieving all the notes
notes.get('/', (req, res) => {
  readFilePromise('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('There was an error adding the note');
  }
});

module.exports = notes;
