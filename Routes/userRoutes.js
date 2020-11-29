/** @format */

const express = require("express");
const router = express.Router();
const { User, ValidateUser } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auther = require("../middleware/auther");

router.get("/me",auther,async(req,res)=>{
    let user = await User.findById(req.user._id).select("-password")
    res.send(user)
})
router.post("/", async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exist");

  user = new User(_.pick(req.body, ["username", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken()

  res.header("x-auth-token",token).send(_.pick(user, ["_id", "username", "email"]));
});
module.exports = router