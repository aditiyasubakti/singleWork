const db = require("../database/db");

function deleteData(tableName, data, callback) {
    const condition = Object.entries(data).map(([column, value]) => `${column} = '${value}'`).join(' AND ');
    const deleteQuery = `DELETE FROM ${tableName} WHERE ${condition}`;

    db.query(deleteQuery, (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
}


module.exports = {
    deleteData
};