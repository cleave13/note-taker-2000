// Require express router method and universally unique ID package.
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// Import helper functions from fsHelper.js file
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
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('There was an error adding the note');
  }
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFilePromise('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted`);
      });
  });

module.exports = notes;
