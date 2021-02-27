module.exports = function (app) {
    /* Returns information of all messages */
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
}