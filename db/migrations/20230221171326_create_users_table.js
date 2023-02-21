exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();

    table.string("username", 128).notNullable().unique();

    table.string("password", 128).notNullable();

    table.integer("adminKey").defaultTo(0);
  });
};

exports.down = function (knex) {
  // Drops the entire table if it exists (opposite of createTable)
  // This is useful for rolling back migrations if something goes wrong
  return knex.schema.dropTableIfExists("users");
};
