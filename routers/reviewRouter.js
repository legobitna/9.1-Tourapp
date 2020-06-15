const router = require("express").Router({ mergeParams: true }); // 이거없으면 중간에있는 tourId 못불러옴
const{auth} = require("../controllers/authController")
const {checkTour} = require("../controllers/tourController")
const {readReviews, createReview,deleteReview,updateReview} = require("../controllers/reviewController")

router
.route("/")
.get(readReviews)
.post(auth,checkTour,createReview)

router
.route("/:id")
.delete(auth,deleteReview)
.put(auth,checkTour,updateReview)


module.exports = router