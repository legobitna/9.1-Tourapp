const router = require("express").Router();
const {createCategory}= require('../controllers/categoryController.js')

router
.route('/')
.post(createCategory)


module.exports = router