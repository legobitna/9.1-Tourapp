exports.catchAsync = func => {
    // return (req, res, next) => func(req, res, next).catch(err => next(err))
    //  for catch() if you simply call another func like below, it will automatically pass the only parameter to the func
    return (req, res, next) => func(req, res, next).catch(e=>next(e)) // next 가 누구인가 어떻게 함수가 넘어가는가 
  }