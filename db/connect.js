const path = require("path");
const sqlite = require("sqlite3");

let db = new sqlite.Database(path.join(__dirname, "./messages.db"), (err) => {
    if (err) {
        return console.error(err.message);
    }
});

module.exports = db;