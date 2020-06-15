const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.login=async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            throw new Error("there is no email or password")
        }
        const user = await User.loginWithEmail(email,password)
        const token = user.generateToken()
        res.status(200).json({
            status:"ok",
            data:{user:user,token:token}
        }) 

    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.logout =async(req,res) =>{
      try{
        const token = req.headers.authorization.replace("Bearer ","")// 다시 헤더에서 토큰가져오기
        req.user.tokens = req.user.tokens.filter(item => item !== token) // 지금쓰고있는 토큰을 리스트에서 지우기
        await req.user.save();
        res.status(204).json({
            status: "success", data: null
        })

      }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
      }
}

exports.auth = async (req,res,next) =>{
    try{
        if(!req.headers.authorization){
            return res.status(400).json({
                status:"fail",
                message:"there is no authorization"
            })
        }
        const token = req.headers.authorization.replace("Bearer ","") // 헤더에서 토큰만 떼어오기
        
        const decoded = jwt.verify(token,process.env.secret)// id랑 유효기간 리턴함
      
        const user = await User.findOne({_id:decoded.id,tokens:token})// 아이디랑 토큰 기반으로 유저 있는지 찾기
        if(!user){
            throw new Error("no user")
        }
  
        req.user = user// 있다면 리퀘스트에 붙이기 
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
    next(); // 이게있어야 logout 으로 넘어감 
}