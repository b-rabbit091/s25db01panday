const mongoose = require("mongoose");

const costumeSchema = mongoose.Schema({
  costume_type: {
    type: String,
    required: [true, "Costume type is required"],
    enum: {
      values: ["superhero", "villain", "historical", "fantasy", "animal", "other"],
      message: "{VALUE} is not a valid costume type",
    },
    trim: true,
  },
  size: {
    type: String,
    required: [true, "Size is required"],
    enum: {
      values: ["XS", "S", "M", "L", "XL", "XXL"],
      message: "{VALUE} is not a valid size",
    },
  },
  cost: {
    type: Number,
    required: [true, "Cost is required"],
    min: [0, "Cost cannot be negative"],
  },
});

module.exports = mongoose.model("Costume", costumeSchema);
