const  Tour = require("../models/tour");


module.exports.getTourService = async (queries) => {
     const getTours = await Tour.find({})
     .select(queries.fields)
     .sort(queries.sortBy)
     .skip(queries.skip)
     .limit(queries.limit)

     const total = await Tour.countDocuments();
     const page = Math.ceil(total / queries.limit)
     return { total, getTours, page };
}

module.exports.createATourService = async (data) => {
    const result = await Tour.create(data)
    return result;
}

module.exports.getSingleIdService = async (tourId) => {
    await Tour.findOneAndUpdate({_id : tourId}, { $inc : {"viewCount" : 1}});
    const result = await Tour.findById(tourId);
    return result;
}

module.exports.updateTourService = async (tourId, tourDetails) => {
     const result  = await Tour.updateOne({_id: tourId}, {$set: tourDetails},{
        runValidators: true,
     })

 return result 
}

module.exports.trendingCountService = async () => {
     const result = await Tour.find({}).sort({viewCount: -1}).limit(3)
     return result
}

module.exports.getCheapestTourService = async (data) => {
    const result = await Tour.find({}).sort({viewCount: 1}).limit(3)
    return result;
}