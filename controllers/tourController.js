const Tour = require("../models/tour");
const { deleteOne,updateOne } = require("./handlerFactory");


exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.find({})
      .populate("organizer", "-_id -password -__v -tokens -createdAt -updatedAt")
      .populate("guides", "_id name");// 일정 필드만 보여주기위해
    res.status(200).json({
      status: "success",
      message: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  
  try {
    const { title, description, guides, category } = req.body;
   
    if (!title || !category) {
      throw new Error("title, organizer,category is required");
    }
    
    const newTour = await Tour.create({ ...req.body, user: req.user._id });
    console.log("new",newTour)
    res.status(200).json({
      status: "success",
      data: { newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getSingleTour = async(req,res)=>{
    try{
        const tour =  await Tour.findById(req.params.id)
        .populate("organizer", "-_id -password -__v -tokens -createdAt -updatedAt")
        .populate("guides", "_id name");
        if(!tour){
            throw new Error("i cant find that tour")
        }

        res.status(200).json({
            status: "success",
            message: tour,
          });

    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message,
          });
    }
}
// exports.updateTour = async(req,res)=>{
//     try{
//         const tour = await Tour.findOne({_id:req.params.id, organizer:{_id:req.user._id}})
//         if(!tour){
//             throw new Error("you are not own this tour, or cant find tour")
//         }
//         const fields = Object.keys(req.body)
//         fields.map(item => tour[item] = req.body[item])
//         await tour.save()
//         res.status(200).json({
//             status:"success",
//             data:{tour}
//         })



//     }catch(err){
//         res.status(400).json({
//             status: "fail",
//             message: err.message,
//           });
//     }
// }
exports.updateTour = updateOne(Tour)
exports.deleteTour = deleteOne(Tour)

exports.checkTour  =async(req,res,next)=>{
  try{
   
    const tour = await Tour.findById(req.params.tourId)
    if(!tour){
      throw new Error("no tour")
    }else{
      console.log("tour",tour)
      req.tour = tour 
    }

  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
  next();
}
