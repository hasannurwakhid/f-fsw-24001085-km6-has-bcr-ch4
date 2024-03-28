const express = require("express");
const router = express.Router();
const car = require("./car");

router.use("/cars", car);

module.exports = router;
