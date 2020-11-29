/** @format */

const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("../models/genres");
// const { ImageStorage } = require("../models/movieImage");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    image:{
      type:String,
    },
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    Rating: {
      type: Number,
      required: true,
    },
    Stock: {
      type: Number,
      required: true,
    },
  })
);

function ValidateMovie(movie) {
  const Schema = Joi.object({
    image:Joi.string().required(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    Rating: Joi.number().required(),
    Stock: Joi.number().required(),
  });
  return Schema.validate(movie);
}

exports.Movie = Movie;
exports.ValidateMovie = ValidateMovie;
