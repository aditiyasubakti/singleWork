const db = require("../database/db");

// Model
function updateData(tableName, data, condition, callback) {
    const setClause = Object.entries(data).map(([column, value]) => `${column} = '${value}'`).join(', ');
    const whereClause = Object.entries(condition).map(([column, value]) => `${column} = '${value}'`).join(' AND ');
    const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;

    db.query(updateQuery, (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
}


module.exports = {
    updateData
};
