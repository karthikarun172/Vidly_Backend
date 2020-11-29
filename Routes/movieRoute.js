/** @format */

const express = require("express");
const router = express.Router();
const { Genre } = require("../models/genres");
const { singleUpload } = require("../models/movieImage");

router.get("/", async (req, res) => {
  let movie = await Movie.find().sort("name");
  res.send(movie);
});

router.get("/:_id", async (req, res) => {
  let movie = Movie.findById(req.params._id);
  res.send(movie);
});

router.post("/", singleUpload, async (req, res) => {
  // const { error } = ValidateMovie(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send("Invalid ID");

  let movie = new Movie({
    image: req.file.path,
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    Rating: req.body.Rating,
    Stock: req.body.Stock,
  });

  movie = await movie.save();
  res.send(movie);
});

router.put("/:_id", async (req, res) => {
  const { error } = ValidateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send("Invalid Id");

  let movie = await Movie.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    Rating: req.body.Rating,
    Stock: req.body.Stock,
  });

  res.send(movie);
});

router.delete("/:_id", async (req, res) => {
  let movie = await Movie.findByIdAndRemove(req.params._id);
  if (!movie) return res.status(400).send("Invalid ID");
  res.send(movie);
});

module.exports = router;
