const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "goodboy";
const fetchuser=require("../middleware/fetchuser")

//Route 1: Creating a user using post request of "/api/auth/createuser"

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a porper email").isEmail(),
    body("password", "Password must be atleast 5").isLength({ min: 5 }),
  ],

  // If there are errors return the bad request and the user

  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ success,errors: errors.array() });
    }

    // Check wether the user with this email already exists

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "A user with this email already exists!!!" });
      }

      // salting the password using bcrypt!!

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // creates a new user

      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      //   .then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success=true;
      res.json({ success,authtoken });
      // res.json(user);
    } catch (error) {
      // this try catch block will check if there is any error while the user is created and saved to the database! if there is any error it will log the error on the console

      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 2: Authenticating a User through Login endpoint "/api/auth/login" so that the user can login to the application

router.post(
  "/login",
  [
    body("email", "Enter a porper email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // write the "User" correctly because it tells about the user who logins through this endpoint.
      let user = await User.findOne({ email }); 

      if (!user) {
        return res.status(400).json({ error: "Please try to login with correct credentials." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({ success, error: "Please check correct credentials!!!." });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured");
      
    }
  }
);

//Route 3: Getting details of the logged in user through getuser endpoint"api/auth/getuser"
router.post(
  "/getuser",fetchuser,async (req, res) => {
try {
  userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Some internal error occured");
}

  }
  )


module.exports = router;
