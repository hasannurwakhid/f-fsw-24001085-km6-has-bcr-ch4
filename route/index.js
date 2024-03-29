const express = require("express");
const router = express.Router();
const car = require("./car");
const transmission = require("./transmission");
const type = require("./type");

router.use("/cars", car);
router.use("/transmissions", transmission);
router.use("/type", type);

module.exports = router;
