/** @format */

const mongoose = require("mongoose");
const Joi = require("joi");
const { required } = require("joi");

const Rental = mongoose.model(
  "Rentals",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        isGold: {
          type: Boolean,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
        },
        Rating: {
          type: Number,
          required: true,
        },
      
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
      required: true,
    },
  })
);

function ValidateRentals(rental) {
  const Schema = Joi.object({
    customer: Joi.string().required(),
    movie: Joi.string().required(),
  });
  return Schema.validate(rental)
}

exports.ValidateRentals = ValidateRentals
exports.Rentals = Rental
