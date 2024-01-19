const db = require("../database/db");


function selectData(table, recordId = null, id = null,callback) {
    let Select;

    if (recordId != null && id != null) {
        Select = `SELECT * FROM ${table} WHERE ${recordId}='${id}'`;
    } else {
        Select = `SELECT * FROM ${table} `;
    }

    db.query(Select, (err, result) => {
        if (err) {
            return callback(err);
        }

        callback(null, result);
    });
}

module.exports = {
    selectData
};
