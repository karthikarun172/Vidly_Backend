/** @format */

const express = require("express");
const router = express.Router();
const { Customer, ValidateCustomer } = require("../models/customer");
const _ = require("lodash")

router.get("/", async (req, res) => {
  let customer = await Customer.find().sort("name");
  res.send(customer);
});

router.get("/:_id", async (req, res) => {
  let customer = await Customer.findById(req.params._id);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = ValidateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer(
    _.pick(req.body, ["name", "email", "isGold", "phone"])
  );

  customer = await customer.save();
  res.send(customer);
});

router.put("/:_id", async (req, res) => {
  const { error } = await Customer.findById(req.params._id);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findByIdAndUpdate(
    req.params._id,
    _.pick(req.body, ["name", "email", "isGold", "phone"]),
    { new: true }
  );

  res.send(customer);
});

router.delete("/:_id", async (req, res) => {
  let customer = Customer.findByIdAndRemove(req.params._id);
  if (!customer) return res.status(400).send("Invalid ID");

  res.send(customer);
});


module.exports = router