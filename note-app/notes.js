const fs = require('fs');

class Notes {
  constructor() {}

  fetchNotes() {
    try { // check for existing notes
      let noteString = fs.readFileSync('data.json');
      return JSON.parse(noteString);
    } catch (e) {
      return [];
    }
  }

  saveNotes(notes) {
    fs.writeFileSync('data.json', JSON.stringify(notes));
  }


  addNote(title, body) {
    let notes = this.fetchNotes();
    // create new note
    const note = {
      title,
      body
    };
    // filter duplicates
    let duplicateNotes = notes.filter((note) => note.title === title);
    // save file if the title is unique
    if (duplicateNotes.length < 1) {
      notes.push(note);
      this.saveNotes(notes);
      return note;
    }
  }

  getNote(title) {
    let notes = this.fetchNotes();
    let filtered = notes.filter((note) => note.title === title);
    return filtered;
  }

  deleteNote(title) {
    let notes = this.fetchNotes();
    let filtered = notes.filter((note) => note.title !== title);
    this.saveNotes(filtered);
    return notes.length !== filtered.length;
  }

  listNotes() {
    return this.fetchNotes();
  }
}

module.exports = new Notes();