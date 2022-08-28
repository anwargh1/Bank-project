const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");

router.get("/transactions", function (req, res) {
  Transaction.find({}, function (err, transaction) {
    res.send(transaction);
  });
});

router.post("/transaction", async function (req, res) {
  let transaction = req.body;
  let t = new Transaction({
    amount: transaction.amount,
    category: transaction.category,
    vendor: transaction.vendor,
  });
  await t.save();
  Transaction.find({}, function (err, transactions) {
    res.send(transactions);
  });
});

router.delete("/transaction/:id", function (req, res) {
  let transactionID = req.params.id;
  Transaction.deleteOne({ _id: transactionID }, function (err) {
    Transaction.find({}, function (err, transactions) {
      res.send(transactions);
    });
  });
});

router.get("/categorys", function (req, res) {
  Transaction.aggregate(
    [
      {
        $group: {
          _id: "$category",
          totalSum: { $sum: "$amount" },
        },
      },
    ],
    function (err, categorys) {
      res.send(categorys);
    }
  );
});

module.exports = router;
