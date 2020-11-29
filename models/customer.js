const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 122,
    },
    email: {
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
  })
);

function ValidateCustomer(customer) {
  const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    isGold: Joi.boolean().required(),
    phone: Joi.number().required(),
  });
  return Schema.validate(customer);
}

exports.Customer = Customer;
exports.ValidateCustomer = ValidateCustomer;
