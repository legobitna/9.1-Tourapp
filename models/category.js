const mongoose =require("mongoose")

const categorySchema =new  mongoose.Schema({
    name:{
        type:String,
        require:[true,"category name is required"]
    }
},{
    timestamps:true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } // 이거두개가 뭐였더라
})

const Category = mongoose.model("Category",categorySchema);
module.exports = Category