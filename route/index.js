const express = require("express");
const router = express.Router();
const car = require("./car");
const transmission = require("./transmission");
const type = require("./type");
const manufacture = require("./manufacture");

router.use("/cars", car);
router.use("/transmissions", transmission);
router.use("/types", type);
router.use("/manufactures", manufacture);

module.exports = router;
