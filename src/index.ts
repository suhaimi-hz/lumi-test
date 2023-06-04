// Hello World!
import 'dotenv/config';
import knex from './db';
import Scheduler from './scheduler';

export * from './server';

(async () => {
  // ONLY FOR TESTING
  knex.migrate.latest()
    .then((result) => {
      console.log('Migration ran successfully!', result);
      knex.seed.run();
    })
    .then(() => {
      // Run scraper
      new Scheduler().run();
    });
})().catch((e) => {
  console.log('PANIC', e);
});
