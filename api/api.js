module.exports = function (app) {
    app.get("/api/messages", function (req, res) {
        const db = require("../db/connect");
        db.all(`SELECT messages.id AS id, username AS user, message, timestamp 
                FROM messages INNER JOIN users ON messages.ref_user = users.id`, 
            [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
    });

    app.get("/api/users", function (req, res) {
        const db = require("../db/connect");
        db.all("SELECT * FROM users", [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
    });
}