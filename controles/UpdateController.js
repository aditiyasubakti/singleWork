const UpdateModel = require("../models/UpdateModels");
//update home
function UpdateHome(req,res) {
    const { nama, stok } = req.body;
    const { id } = req.params;
    
    const dataUpdate={
        nama_brg:nama,
        stok:stok
    };
    const condition={
        id_brg:id
    };

    UpdateModel.updateData("barang", dataUpdate, condition, (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.redirect("/");
    });
}

module.exports = { UpdateHome };
