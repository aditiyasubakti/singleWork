const InsertModel = require("../models/InsertModels");

function InsertHome(req,res) {
    const {id, nama,stok }=req.body;
    if(!id || !nama || !stok){
        return res.status(400).send("Data harus di isi Semua");
    }
    const dataInsert={
        id_brng:id,
        nama:nama,
        stok:stok
    }

    InsertModel.insertData("barang",dataInsert, (err,result)=>{
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        res.redirect("/");
    });
}



module.exports = { InsertHome};