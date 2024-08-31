const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// const jwtSecret = "helloWord$123";

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email", "Please enter a valid email address").isEmail(),
    body("password", "Password must be minimum 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      console.log("Inside createuser route");
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  }
);
router.post(
  "/login",
  [
    body("email", "Please enter a valid email address").isEmail(),
    body("password", "Password must be minimum 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log("Inside login route");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Please enter valid login credentials!" });
      }
      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ message: "Please enter valid login credentials!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  }
);

module.exports = router;
