const session = require("express-session");
const SelectModel = require("../models/SelectModels");

function SelectHome(req, res) {
    SelectModel.selectData("barang", null, null, (err, result) => {
       
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        if (req.session.nama && req.session.id_user) {
            const users = JSON.parse(JSON.stringify(result));
            res.render("testing", { users: users, session:req.session, title: "aditiya Subakti" });
        }else{
            res.redirect("/example/Login");
        }
        
    });
}

function SelectUpdate(req,res) {
    const {id}=req.params;
    SelectModel.selectData("barang","id_brg",id,(err, result) => {
         if (err) {
             console.error("Error fetching data for update:", err);
             return res.status(500).send("Internal Server Error");
         }
 
         if (result.length === 0) {
             console.error("No data found for update");
             return res.status(404).send("Data not found");
         }
 
         const user = result[0];
         res.render("exampel/update", { user, title: "Update Data" });
     });
}

module.exports = { SelectHome,SelectUpdate };
