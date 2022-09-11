const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
console.log(Transaction);
router.get("/transactions", function (req, res) {
  Transaction.find({}, function (err, transaction) {
    res.send(transaction);
    // console.log(transaction);
  });
});

router.post("/transaction", async function (req, res) {
  let transaction = req.body;
  console.log(transaction);
  let t = new Transaction({
    amount: transaction.amount,
    category: transaction.category,
    vendor: transaction.vendor,
  });
  await t.save();
  res.end();
});

router.delete("/transaction/:id", function (req, res) {
  let transactionID = req.params.id;
  Transaction.deleteOne({ _id: transactionID }, function (err) {
    res.end();
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
