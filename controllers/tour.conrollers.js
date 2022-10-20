const Tour = require("../models/tour");
const { 
   createATourService,
   getTourService,
   getSingleIdService,
   updateTourService,
   trendingCountService,
   getCheapestTourService,
 } = require("../services/tourServices");

module.exports.getAllTours = async (req, res, next) => {

   const queries = {};
   
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy
    }

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
    }

    if(req.query.page){
       const { page = 1, limit = 5 } = req.query;
       const skip = (page - 1) * parseInt(limit);
       queries.skip = skip;
       queries.limit = limit;
    }

    const result = await getTourService(queries)

    res.status(200).json({
      status: "success",
      message: "successfuly data get",
      result: result,
    })
};

module.exports.createATour = async (req, res, next) => {
  try {
    const result = await createATourService(req.body);
    console.log(result);
    res.status(200).json({
      status: "Success",
      message: "Successfuly created data",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't create Data",
      error: error.message,
    });
  }
};


module.exports.getSingleTour = async (req, res, next) => {
     try {
      const { id } = req.params;
      const getId = { _id: id}
      const result = await getSingleIdService(getId)
      res.status(200).json({
         status: "success",
         message: "successfuly get id details",
         result: result,
      })
     } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Can't get single id details",
        error: error.message,
      });
     }
}
module.exports.updateATour = async (req, res) => {
   try{
    const { id } = req.params;
    const tourId = {_id: id}
    const result = await updateTourService(tourId, req.body);
    
    res.status(200).json({
      status: "success",
      message: "successfuly get id details",
      result: result,
   })
   } catch (error){
    res.status(400).json({
      status: "fail",
      message: "Can't update Tour try again",
      error: error.message,
    });
   }
}

module.exports.trendingCount = async (req, res) => {
    try{
      const filters = req.query;

    const queries = {};

    if(req.query.sort){
      const sortBy = req.query.sort.split(",").join(" ")
      queries.sortBy = sortBy
    }
    
    if(req.query.limit){
        const { limit = 3 } = req.query;
        queries.limit = limit
    }

      const result = await trendingCountService(filters, queries);
      res.status(200).json({
        status: "success",
        message: "successfuly get Top tour view",
        result: result,
     })
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Can't get Top tour view!!",
        error: error.message,
      });
    }
}

module.exports.getCheapestTour = async (req, res) => {
    try{
      
      const result = await getCheapestTourService(req.query);

      res.status(200).json({
        status: "success",
        message: "successfuly get Cheapest tour!",
        result: result,
     })
    } catch (error){
      res.status(400).json({
        status: "fail",
        message: "Can't get Cheapest Tour!!",
        error: error.message,
      });
    }
}