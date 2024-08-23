const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const FoodItem = require("../model/FoodItem");
const FoodCategory = require("../model/FoodCategory");

router.post("/fooddata", async (req, res) => {
  try {
    // const FoodItemsModel = mongoose.model("FoodItems", {}, "food_items");
    const foodItems = await FoodItem.find({});
    // console.log(`$$$FOOD_ITEMS1 = ${foodItems}`);
    // const FoodCategoryModel = mongoose.model(
    //   "FoodCategory",
    //   {},
    //   "foodCategory"
    // );
    const foodCategory = await FoodCategory.find({});
    console.log(`FOODCATEGORY = ${foodCategory}`);
    // console.log(`$$$FOOD_ITEMS = ${foodCategory}`);
    res.json({ foodCategory: foodCategory, foodItems: foodItems });
  } catch (err) {
    console.log(err);
    res.send("server error");
  }
});

module.exports = router;
