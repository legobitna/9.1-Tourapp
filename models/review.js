const mongoose = require("mongoose");
const Tour = require("./tour");
const reviewSchema = mongoose.Schema({
    comment:{
        type:String,
        require:[true,"comment is required"]

    },
    rating:{
        type:Number,
        require:[true,"rate is required"],
        min:1,
        max:5
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,"user is required"]
    },
    tourId:{
        type:mongoose.Schema.ObjectId,
        ref:"Tour",
        required:[true,"tour id is required"]
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject: { virtuals: true }
})

reviewSchema.pre("save",async function(next){ // this 는 지금 만들려는 객체 
    if(!this.isModified("user")|| !this.isModified('tourId'))return next();
    const found = await User.findById(this.user._id)
    if(!found){
      throw new Error("user doesn't exist")
    }
    const tour = await Tour.findById(this.tourId)
    if(!tour){
        throw new Error("tour doesn't exist")
      }
    next();
  })


const Review = mongoose.model("Review",reviewSchema)
module.exports = Review