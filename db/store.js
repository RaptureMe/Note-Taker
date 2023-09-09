const fs = require('fs');
const util = require('util');

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
}

module.exports = new Store();