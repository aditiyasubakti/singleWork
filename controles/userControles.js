const userModel = require("../models/userModels");

//PROSES LOGIN
function LoginHome(req,res) {
        const { user, pass } = req.body;
        if (req.session.id_user && req.session.nama) {
            res.redirect("../");
        } 
        else{
            
            if (!user || !pass) {
                return res.status(400).send("Username or password is incorrect");
            }

            userModel.ReadUser("user","user",user, (err, storedUser) => {
                if (err) {
                    return res.status(500).send("Internal Server Error");
                }

                if (!storedUser) {
                    return res.status(404).send("User not found");
                }

                
                if (pass === storedUser.pass) {
                
                    req.session.id_user = storedUser.id_user;
                    req.session.nama = storedUser.nama;
                    res.redirect("/");
                } else {
                    res.status(401).send("Incorrect password");
                }
            });
        }
}
//TAMPILAN LOGIN
function LoginReedirect(req,res) {
    if (req.session.id_user && req.session.nama) {
         res.redirect("/");
    } else{
        res.render("exampel/login.ejs");

    }
}
//LOGOUT
function LogoutLogin(req,res) {
    req.session.destroy((err)=>{
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/login");
    });
}

module.exports = { LoginHome,LoginReedirect,LogoutLogin };
