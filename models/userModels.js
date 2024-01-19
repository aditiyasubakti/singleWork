const db = require("../database/db");

function ReadUser(tableName,fieldUsername,username, callback) {
    const query = `SELECT * FROM ${tableName} WHERE ${fieldUsername}='${username}'`;
    
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }

        if (results.length === 0) {
            return callback(null, null);
        }

        const user = results[0];
        callback(null, user);
    });
}

module.exports = {
    ReadUser,
};
