const mongoose = require("mongoose");

const TourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide an valide name"],
      trim: true,
      unique: [true, "Give an unique name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name must be max 20 word"],
    },
    phone: {
      type: Number,
      required: true,
      min: [11, "phone number must be give 11"],
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      default: 0
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    catagories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
