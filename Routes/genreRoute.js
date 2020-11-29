/** @format */

const express = require("express");
const router = express.Router();
const { Genre, ValidateGenre } = require("../models/genres");
const auther = require("../middleware/auther");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  let genre = await Genre.find().sort("name");
  res.send(genre);
});

router.get("/:_id", async (req, res) => {
  let genre = await Genre.findById(req.params._id);
  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = ValidateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:_id", async (req, res) => {
  const { error } = ValidateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findByIdAndUpdate(
    req.params._id,
    { name: req.body.name },
    { new: true }
  );
  res.send(genre);
});

router.delete("/:_id", [auther, admin], async (req, res) => {
  let genre = await Genre.findByIdAndRemove(req.params._id);
  if (!genre) return res.status(400).send("Invalid ID");

  res.send(genre);
});

module.exports = router;
