/** @format */

const express = require("express");
const router = express();
const { singleUpload } = require("../models/movieImage");
const {mongo,connection} = require("mongoose")
const Grid = require('gridfs-stream');
Grid.mongo = mongo;

let gfs = Grid("mongodb://localhost/dawPrac");

router.get("/files/:filename", (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find file",
      });
    }

    var readstream = gfs.createReadStream({
      filename: files[0].filename,
    });
    res.set("Content-Type", files[0].contentType);
    return readstream.pipe(res);
  });
});

router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        message: "Could not find files",
      });
    }
    return res.json(files);
  });
});

router.post("/files", singleUpload, (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      file: req.file,
    });
  }
  res.send({ success: false });
});

router.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).json({ success: false });
    return res.json({ success: true });
  });
});

module.exports = router;
