module.exports = new class {
    /* Inserts a new user */
    user(username) {
        const db = require("./connect");
        let stmt = db.prepare("INSERT INTO users (username) VALUES (?)");

        stmt.run(username, (err) => {
            if (err) {
                if (err.errno == 19) { /* Catches the UNIQUE constraint error */ }
                else {
                    throw err;
                }
            }
        });
    };

    /* Inserts a new message */
    message(messageDescription) {
        const db = require("./connect");
        let stmt = db.prepare(`
            INSERT INTO messages (ref_user, message, timestamp) 
            VALUES ( (SELECT id FROM users WHERE username=?), ?, ? )
        `);
        stmt.run(messageDescription.user, messageDescription.message, messageDescription.timestamp, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}