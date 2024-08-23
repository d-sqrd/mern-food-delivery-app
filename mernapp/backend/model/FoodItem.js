const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  options: {
    type: Array,
  },
  description: {
    type: Array,
  },
});

module.exports = mongoose.model("fooditem", foodItemSchema);
