const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// GET route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
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

    //TODO: write code to append the new object to the array in db.json
    
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = notes;
