/** @format */

const router = require("express").Router();
const multer = require("multer");
const Grid = require("gridfs-stream");
const { connection } = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");

const ImageStorage = new GridFsStorage({
  url: "mongodb://localhost/dawPrac",
  file: (req, file) => {
    return {
      filename: file.originalname,
    };
  },
});
// sets file input to single file
const singleUpload = multer({ storage: ImageStorage }).single("image");


exports.singleUpload = singleUpload;
