const {getTour,createTour,getSingleTour,updateTour,deleteTour}= require('../controllers/tourController.js')
const router = require("express").Router();
const {auth} = require("../controllers/authController.js")

// router
// .route('/tours')
// .get(getTour)
// .post(auth,createTour)

// router
// .route('/tours/:id')
// .get(getSingleTour)
// .put(auth,updateTour)
// .delete(auth,deleteTour)

router
.route('/')
.get(getTour)
.post(auth,createTour)

router
.route('/:id')
.get(getSingleTour)
.put(auth,updateTour)
.delete(auth,deleteTour)

module.exports= router