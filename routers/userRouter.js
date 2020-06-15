const router = require("express").Router();
const {createUser,updateProfile} =require("../controllers/userController.js")

// router
// .route("/users")
// .post(createUser)

// router 
// .route("/users/:id")
// .put(updateProfile)
router
.route("/") // app.js에 '/users'이미해놔서 필요없음
.post(createUser)

router 
.route("/:id")
.put(updateProfile)

module.exports=router