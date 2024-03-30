const express = require("express");
const router = express.Router();

const specTransactionController = require("../controller/spec_transaction");

router
  .route("/")
  .get(specTransactionController.getSpecTransactions)
  .post(specTransactionController.createSpecTransaction);

router
  .route("/:id")
  .get(specTransactionController.getSpecTransaction)
  .put(specTransactionController.updateSpecTransaction)
  .delete(specTransactionController.deleteSpecTransaction);

module.exports = router;
