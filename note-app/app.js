const fs = require('fs');
const os = require('os');

const yargs = require('yargs');
const notes = require('./notes');


const log = (x) => {
  console.log(`Note found`);
  console.log(`-----`);
  console.log(`Title: ${x.title}`);
  console.log(`Body: ${x.body}`);
}

const titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: {
      describe: 'Body of the note',
      demand: true,
      alias: 'b'
    }
  })
  .command('delete', 'Delete a note', {
    title: titleOptions
  })
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('list', 'List all notes')
  .help()
  .argv;

const cmd = argv._[0];

if (cmd == 'add') {
  let note = notes.addNote(argv.title, argv.body);

  if (note) {
    log(x);
  } else {
    console.log(`Note title taken`);
  }

} else if (cmd == 'delete') {
  let deletedNote = notes.deleteNote(argv.title);
  let msg = deletedNote ? 'Note deleted' : 'Note not found'
  console.log(msg);

} else if (cmd == 'list') {
  let allNotes = notes.listNotes();
  allNotes.forEach((note) => {
    console.log(note);
  });

} else if (cmd == 'read') {
  let note = notes.getNote(argv.title);

  if (note[0]) log(note[0]);
  else console.log(`Note not found`);

} else {
  console.log(`Command not found`);
}