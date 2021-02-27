const db = require("./connect");

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE
    )
`, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        ref_user INTEGER NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME NOT NULL,
        FOREIGN KEY (ref_user) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE CASCADE
    )
`, (err) => {
    if (err) {
        return console.error(err.message);
    }
})
