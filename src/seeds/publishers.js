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
      id: 1,
    },
    {
      slug: 'utusan',
      name: 'Utusan Malaysia',
      id: 2,
    },
    {
      slug: 'says',
      name: 'SAYS',
      id: 3,
    },
  ]);
};
