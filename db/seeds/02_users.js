const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "Alice",
          password: bcrypt.hashSync("pass1", 14),
          adminKey: 420,
        },
        {
          id: 2,
          username: "Bob",
          password: bcrypt.hashSync("pass2", 14),
        },
      ]);
    });
};
