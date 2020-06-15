const mongoose =require("mongoose")
const validator =require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const saltRounds=10

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"user Must have a name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"user Must have Email"],
        trim:true,
        lowercase:true,
        unique:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("invalid email")
            }
        }
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    tokens:[{type:String}]
},{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,saltRounds)
    next();
})

userSchema.statics.loginWithEmail =async(email,password)=>{ //왜 static 이었찌?
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("there is no emal")
    }
    const match = bcrypt.compare(password,user.password)// 인코딩된 패스워드 비교해줌 
    if(!match){
        throw new Error("password is not match")
    }
    return user 
}

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({id:user._id},process.env.secret,{expiresIn:'7d'})
    user.tokens.push(token)
    await user.save();
    return token ;

}

const User = mongoose.model("User",userSchema);
module.exports=User;