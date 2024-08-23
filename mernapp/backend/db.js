require("dotenv").config();

const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (err) {
    console.log(`Error connecting to mongoDB...ERROR = ${err}`);
  }
};

module.exports = mongoDB;
