const Review = require('../models/review')
const { deleteOne, updateOne } = require("./handlerFactory");

exports.readReviews = async(req,res)=>{
    try{
        const reviews = await Review.find({tourId:req.params.tourId})
        res.status(200).json({
            status: "success",
            message: reviews,
          });

    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message,
          }); 
    }
}

exports.createReview = async(req,res)=>{
    try{
        const reviews = await Review.create({...req.body,user:req.user._id,tourId:req.tour._id})

        res.status(200).json({
            status: "success",
            message: reviews,
          });

    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message,
          }); 
    }
}

exports.deleteReview = deleteOne(Review)
exports.updateReview = updateOne(Review)