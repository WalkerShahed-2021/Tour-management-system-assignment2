const express  = require("express");
const tourControllers = require("../controllers/tour.conrollers");

const router = express.Router();


router
.route("/trending")
.get(tourControllers.trendingCount)

router
.route("/cheapest")
.get(tourControllers.getCheapestTour)

router
.route("/")
.get(tourControllers.getAllTours)
.post(tourControllers.createATour)


router
.route("/:id")
.get(tourControllers.getSingleTour)
.patch(tourControllers.updateATour)

// hello

module.exports = router;