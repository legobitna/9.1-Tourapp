const router = require("express").Router();
 const {login,logout,auth} = require("../controllers/authController.js")


router
.route("/login")
.post(login)

router
.route('/logout')
.post(auth,logout)

module.exports= router
