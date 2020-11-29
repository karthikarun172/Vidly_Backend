/** @format */
require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const express = require("express");
const config = require("config");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const Customer = require("./Routes/customerRoute");
const Genre = require("./Routes/genreRoute");
const Movie = require("./Routes/movieRoute");
const Rental = require("./Routes/rentalRoute");
const User = require("./Routes/userRoutes");
const Auth = require("./Routes/auth");
const error = require("./middleware/error");
const Images = require("./Routes/movieImageRoute");
const compression = require("compression");

// process.on("uncaughtException", (ex) => {
//   console.log("We Got An UnCaught Exception");
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// winston.handleExceptions(
//   new winston.transports.File({ filename: "uncaughtException.log" })
// );

// process.on("unhandledRejection", (ex) => {
//   throw ex;
// });

// winston.add(winston.transports.File, { filename: "logfile.log" });
// winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/dawPrac" });

// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL Error: jwtPrivateKey is not defined");
//   process.exit(1);
// }
let db = config.get("db");
mongoose.connect(db).then(() => winston.info(`Connected to ${db}`));
// .catch((er) => console.log(er, "Could not lconnect"));

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use("/api/customer", Customer);
app.use("/api/genre", Genre);
app.use("/api/movie", Movie);
app.use("/api/rental", Rental);
app.use("/api/user", User);
app.use("/api/auth", Auth);

// app.use(error);

const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  winston.info(`Listeninig to port ${port}`)
);

exports.server = server;
