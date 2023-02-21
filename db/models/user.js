// require the database configuration module
const db = require("../dbConfig");

module.exports = {
  findAll: () => {
    return db("users");
  },
  findByUsername: ({ username }) => {
    return db("users").where({ username }).first();
  },
  create: (user) => {
    return db("users").insert(user).returning("*");
  },
  update: (id, user) => {
    return db("users").where({ id }).update(user).returning("*");
  },
  delete: (id) => {
    return db("user").where({ id }).del();
  },
};
