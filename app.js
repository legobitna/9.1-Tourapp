const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")// 이거뭐하는거지
require("dotenv").config({path:".env"});


// const {createUser,updateProfile} =require("./controllers/userController.js")
// const {login,logout,auth} = require("./controllers/authController.js")
// const {getTour,createTour,getSingleTour,updateTour,deleteTour}= require('./controllers/tourController.js')
const {errorController} = require('./controllers/errorController')

const userRouter = require("./routers/userRouter")
const tourRouter=require("./routers/tourRouter")
const authRouter = require("./routers/authRouter")
const categoryRouter = require("./routers/categoryRouter")
const reviewRouter = require("./routers/reviewRouter");
const AppError = require("./src/util/appError");

const app= express();
const router = express.Router();
app.use(bodyParser.urlencoded({extended:true}))//뭐지
app.use(bodyParser.json())//모지
app.use(router)

mongoose.connect(process.env.DB,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(()=>console.log("hehe"))

router.use("/users", userRouter);// 9.1내용, 기존에 라우터를 다 userRouter 파일로 옴기고 이것만 app.js에두기
router.use("/tours",tourRouter)
router.use('/auth',authRouter)
router.use("/category",categoryRouter)
router.use("/tours/:tourId/reviews",reviewRouter)

function notFound(req, res, next) {
    // const err = new Error("Route not found");
    // err.status = "fail";
    // err.statusCode = 404;
    next(new AppError(404,"Route not found"));
  };
  
router.route("*").all(notFound);
app.use(errorController) // 왜 이게 필요하지? notfound에서 해결하고끝난거아닌가?






app.listen(process.env.PORT, () =>{
    console.log("server Running on "+ process.env.PORT)
})                 
