const db = require("../database/db");

function insertData(tableName, data, callback) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(value => `'${value}'`).join(', ');

    const insert = `INSERT INTO ${tableName} (${columns}) VALUES(${values})`;

    db.query(insert, (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
}

module.exports = {
    insertData
};
