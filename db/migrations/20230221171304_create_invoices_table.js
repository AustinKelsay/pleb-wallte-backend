exports.up = function (knex) {
  return knex.schema.createTable("invoices", function (table) {
    // Creates an auto-incrementing PK column called id
    table.increments("id").primary();
    // Creates a text column called payment_request which is both required and unique
    table.string("payment_request").notNullable().unique();

    table.integer("value").notNullable();

    table.string("memo");

    table.integer("fees");

    table.boolean("send").notNullable();

    table.boolean("settled").notNullable();

    table.timestamp("settle_date").defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    // Add a foreign key reference to the users table
    table.integer("user_id").unsigned().notNullable();

    table.foreign("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  // Drops the entire table if it exists (opposite of createTable)
  // This is useful for rolling back migrations if something goes wrong
  return knex.schema.dropTableIfExists("invoices");
};
