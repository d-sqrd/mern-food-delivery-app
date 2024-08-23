const mongoose = require("mongoose");

const foodCategoryNameSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
});

module.exports = mongoose.model("foodcategoryname", foodCategoryNameSchema);
