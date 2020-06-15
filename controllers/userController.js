const User = require("../models/user")
var ObjectId = require('mongoose').Types.ObjectId;


exports.createUser = async (req,res) =>{

    try{
        const {name,email,password} =  req.body
        if(!name && !email && !password){
            return res.status(400).json({
                status:"fail",
                message:"name, email and password are required"
            })
        }
        const newUser = new User({name,email,password})
        await newUser.save();
        res.status(200).json({
            status:"success",
            data:{newUser}
        })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.updateProfile = async (req,res) =>{
    try{
        const user2 = await User.findById(req.params.id) // 이거 내일 질문하기
        console.log("parap",req.params.id)
        console.log("uuu",user2.name)
        const fields = Object.keys(req.body)
        fields.map(item => user2[item] = req.body[item])
        await user2.save()
        res.status(200).json({
            status:"success",
            data:{user2}
        })

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}