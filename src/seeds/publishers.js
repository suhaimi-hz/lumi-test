/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('publisher').del();
  await knex('publisher').insert([
    {
      slug: 'bh',
      name: 'Berita Harian',
      language: 'ms',
      id: 1,
    },
    {
      slug: 'utusan',
      name: 'Utusan Malaysia',
      language: 'ms',
      id: 2,
    },
    {
      slug: 'says',
      name: 'SAYS',
      language: 'en',
      id: 3,
    },
  ]);
};
