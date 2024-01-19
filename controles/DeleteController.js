const deleteModel = require("../models/DeleteModels");


function homeDelete(req,res) {
        const { id } = req.params;
        const dataDelete = {
            id_brg: id
        };
        deleteModel.deleteData("barang", dataDelete, (err, result) => {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            res.redirect("/");
        });
}



module.exports = { homeDelete };
