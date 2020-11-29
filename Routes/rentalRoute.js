/** @format */

const express = require("express");
const Fawn = require("fawn");
const router = express.Router();
const mongoose = require("mongoose");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movies");
const { Rentals, ValidateRentals } = require("../models/rentals");

Fawn.init(mongoose);
router.get("/", async (req, res) => {
  let rental = await Rentals.find().sort();
  res.send(rental);
});

router.get("/:_id", async (req, res) => {
  let rental = await Rentals.findById(req.params._id);
  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error } = ValidateRentals(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findById(req.body.customer);
  if (!customer) return res.status(400).send("Invalid Customer ID");

  let movie = await Movie.findById(req.body.movie);
  if (!movie) return res.status(400).send("Invalid Movie Id");

  let rental = new Rentals({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      Rating: movie.Rating,
    },
  });

  // rental = await rental.save()
  // movie.Stock--
  // movie.save()
  try{
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { Stock: -1 } })
      .run();
  }catch(er){
    console.log("error",er)
  }

  res.send(rental);
});

router.put("/:_id", async (req, res) => {
  const { error } = ValidateRentals(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findById(req.body.customer);
  if (!customer) return res.status(400).send("Invalid Customer ID");

  let movie = await Customer.findById(req.body.movie);
  if (!movie) return res.status(400).send("Invalid Movie ID");

  let rental = await Rentals.findByIdAndUpdate(
    req.params._id,
    {
      customer: {
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        title: movie.title,
        Rating: movie.Rating,
      },
    },
    { new: true }
  );

  res.send(rental);
});

router.delete("/:_id", async (req, res) => {
  let rental = await Rentals.findByIdAndRemove(req.params._id);
  if (!rental) return res.status(400).send("Invalid Id");
  res.send(rental);
});

module.exports = router;
