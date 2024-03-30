const express = require("express");
const router = express.Router();
const dashboardListCarController = require("../controller/dashboardListCar");

router.get("/", dashboardListCarController.tampilHalaman);
// router.post("/", dashboardListCarController.searchCar);

module.exports = router;
