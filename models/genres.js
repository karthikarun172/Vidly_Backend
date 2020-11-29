/** @format */
const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function ValidateGenre(genre) {
  const Schema = Joi.object({
    name: Joi.string().required(),
  });
  return Schema.validate(genre);
}

exports.Genre = Genre;
exports.ValidateGenre = ValidateGenre;
exports.genreSchema = genreSchema;
