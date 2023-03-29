const router = require("express").Router();
const Invoice = require("../db/models/invoice.js");
const authenticate = require("../routers/middleware/authenticate.js");
const authenticateAdmin = require("../routers/middleware/authenticateAdmin.js");

const {
  getBalance,
  createInvoice,
  getChannelBalance,
  payInvoice,
} = require("../lnd.js");

router.get("/balance", (req, res) => {
  getBalance()
    .then((balance) => {
      res.status(200).json(balance);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/channelbalance", (req, res) => {
  getChannelBalance()
    .then((channelBalance) => {
      res.status(200).json(channelBalance);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/invoices", (req, res) => {
  Invoice.findAll()
    .then((invoices) => {
      res.status(200).json(invoices);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/invoice", authenticate, (req, res) => {
  const { value, memo, user_id } = req.body;

  createInvoice({ value, memo, user_id })
    .then((invoice) => {
      res.status(200).json(invoice);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/pay", authenticateAdmin, async (req, res) => {
  const { payment_request } = req.body;

  const pay = await payInvoice({ payment_request });

  if (pay.payment_error) {
    res.status(500).json(pay.payment_error);
  }

  if (pay?.payment_route) {
    const payment = await Invoice.create({
      payment_request: payment_request,
      send: true,
      value: pay.payment_route.total_amt,
      fees: pay.payment_route.total_fees,
      settled: true,
      settle_date: Date.now(),
    });

    res.status(200).json(payment);
  }
});

module.exports = router;
