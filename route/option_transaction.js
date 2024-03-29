const express = require("express");
const router = express.Router();

const optionTransactionController = require("../controller/option_transaction");

router
  .route("/")
  .get(optionTransactionController.getOptionTransactions)
  .post(optionTransactionController.createOptionTransaction);

router
  .route("/:id")
  .get(optionTransactionController.getOptionTransaction)
  .put(optionTransactionController.updateOptionTransaction)
  .delete(optionTransactionController.deleteOptionTransaction);

module.exports = router;
