const path = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'db.sqlite3'),
  },
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
  useNullAsDefault: true,
};
