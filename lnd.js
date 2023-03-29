const LndGrpc = require("lnd-grpc");
const dotenv = require("dotenv");
const Invoice = require("./db/models/invoice.js");

dotenv.config();

const options = {
  host: process.env.HOST,
  cert: process.env.CERT,
  macaroon: process.env.MACAROON,
};

const grpc = new LndGrpc(options);

const connect = async () => {
  await grpc.connect();

  invoiceEventStream();
};

const getBalance = async () => {
  const balance = await grpc.services.Lightning.walletBalance();
  return balance;
};

const getChannelBalance = async () => {
  const channelBalance = await grpc.services.Lightning.channelBalance();
  return channelBalance;
};

const createInvoice = async ({ value, memo, user_id }) => {
  const invoice = await grpc.services.Lightning.addInvoice({
    value: value,
    memo: memo,
  });

  await Invoice.create({
    payment_request: invoice.payment_request,
    value: value,
    memo: memo,
    settled: false,
    send: false,
    user_id: user_id,
  });

  return invoice;
};

const payInvoice = async ({ payment_request }) => {
  const paidInvoice = await grpc.services.Lightning.sendPaymentSync({
    payment_request: payment_request,
  });

  return paidInvoice;
};

const invoiceEventStream = async () => {
  await grpc.services.Lightning.subscribeInvoices({
    add_index: 0,
    settle_index: 0,
  })
    .on("data", async (data) => {
      if (data.settled) {
        // Check if the invoice exists in the database
        const existingInvoice = await Invoice.findOne(data.payment_request);

        // If the invoice exists, update it in the database
        if (existingInvoice) {
          await Invoice.update(data.payment_request, {
            settled: data.settled,
            settle_date: data.settle_date,
          });
        } else {
          console.log("Invoice not found in the database");
        }
      } else {
        console.log("dataaa", data);
      }
    })
    .on("error", (err) => {
      console.log(err);
    });
};

module.exports = {
  connect,
  grpc,
  getBalance,
  createInvoice,
  getChannelBalance,
  payInvoice,
};
