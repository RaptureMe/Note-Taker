const fs = require('fs');
const util = require('util');
const uuid = require('uuid')

const asyncFileRead = util.promisify(fs.readFile)
const asyncFileWrite = util.promisify(fs.writeFile)

class Store {
    read() {
        return asyncFileRead("db/db.json","utf-8");
    }
    write(input) {
        return asyncFileWrite("db/db.json", JSON.stringify(input));
    }
    getNotes() {
        return this.read().then((userNotes) => {
            return JSON.parse(userNotes)
        })
    }
    writeNotes(storeNote) {
        storeNote.id = uuid.v4()
        return this.getNotes().then((gottenNotes) => {
            gottenNotes.push(storeNote);
            this.write(gottenNotes);
            return storeNote;
        })
    }
    deleteNote(noteId) {
        return this.getNotes().then((gottenNotes) => {
            const filterNotes = gottenNotes.filter((note) => {
                return note.id !== noteId
            })
            this.write(filterNotes);
        })
    }
}

module.exports = new Store();