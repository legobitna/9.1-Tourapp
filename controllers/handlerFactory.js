const AppError = require("../src/util/appError");
const {catchAsync}= require("../src/util/catchAsync")

exports.deleteOne = Model=> catchAsync(async function (req, res,next) {
    // try {
      const doc = await Model.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });
      if (!doc) return next(new AppError(404,"There is no such item"))
      // if (!doc) return res.status(404).json({ status: "fail", message: "There is no such item" });
      res.status(204).end();
    // } catch (error) {
      // res.status(400).json({ status: "fail", message: error.message });
    // };
  }
)

  exports.updateOne= Model => catchAsync(async function (req, res,next) {
    
      // check review & owner 
      const doc = await Model.findOne({ _id: req.params.id, user: req.user._id });
      // if (!doc) return res.status(404).json({ status: "fail", message: "There is no such item" });
      if(!doc) return new AppError(404,"There is no such item")
    let fields = Object.keys(req.body)
    fields.map(item => doc[item] = req.body[item])
      // save
      await doc.save();
      return res.json({ status: "success", data: doc });

    
  })
  // exports.updateOne = Model => async function (req, res) {
  //   try {
  //     // check review & owner 
  //     const doc = await Model.findOne({ _id: req.params.id, user: req.user._id });
  //     // if (!doc) return res.status(404).json({ status: "fail", message: "There is no such item" });
  //     if(!doc) return new AppError(404,"There is no such item")
  //     // specify which fields are allowed to be edited
  //   //   const allows = ["rating", "review"];
  //   //   Object.keys(req.body).forEach(el => {
  //   //     if (allows.includes(el))
  //   //       doc[el] = req.body[el];
  //   //   });
  //   let fields = Object.keys(req.body)
  //   fields.map(item => doc[item] = req.body[item])
  //     // save
  //     await doc.save();
  //     res.json({ status: "success", data: doc });

  //   } catch (error) {
  //     res.status(400).json({ status: "fail", message: error.message });
  //   };
  // };