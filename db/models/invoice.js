// require the database configuration module
const db = require("../dbConfig");

module.exports = {
  findById: (id) => {
    return db("invoices").where({ id }).first();
  },
  create: (invoice) => {
    return db("invoices").insert(invoice).returning("*");
  },
  update: (payment_request, invoice) => {
    return db("invoices")
      .where({ payment_request })
      .update(invoice)
      .returning("*");
  },
  delete: (id) => {
    return db("invoices").where({ id }).del();
  },
};
