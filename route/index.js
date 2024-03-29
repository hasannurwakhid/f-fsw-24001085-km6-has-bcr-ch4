const express = require("express");
const router = express.Router();
const car = require("./car");
const transmission = require("./transmission");


router.use("/cars", car);
router.use("/transmissions", transmission);


module.exports = router;
