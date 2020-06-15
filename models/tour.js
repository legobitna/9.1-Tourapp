const mongoose =require("mongoose")
const User = require("./user")

const tourSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"]
    },
    description:{
        type:String
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    },
    guides:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ],
    category:[{
        type:mongoose.ObjectId,
        ref:"Category",
        required:[true,"category is requried"]
    }]

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}  // 이게 뭐하는거였는지 까먹음
})


tourSchema.pre("save",async function(next){ // this 는 지금 만들려는 객체 
    if(!this.isModified("guides"))return next();
    const found = await User.find({_id:{$in:this.guides}}).select("_id");
    if(found.length !== this.guides.length){
      throw new Error("guides doesn't exist")
    }
    next();
  })


const Tour = mongoose.model("Tour",tourSchema)
module.exports =  Tour