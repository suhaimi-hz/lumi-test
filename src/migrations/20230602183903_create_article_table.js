/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema
  .createTable('article', (table) => {
    table.increments('id').primary();
    table.string('sourceId');
    table.string('publisherSlug');
    table.string('title');
    table.string('author');
    table.string('link');
    table.string('imageUrl');
    table.datetime('date', { useTz: true });
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema
  .dropTable('article');
