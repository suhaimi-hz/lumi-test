/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema
  .createTable('publisher', (table) => {
    table.increments('id').primary();
    table.string('slug');
    table.string('name');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema
  .dropTable('publisher');
