// Scheduler that will run news scraper
import Utusan from './scraper/utusan';
import BeritaHarian from './scraper/berita_harian';
import Says from './scraper/says';

export default class Scheduler {
  intervalTime: number;

  interval;

  constructor() {
    this.intervalTime = 300000; // Internal in miliseconds
  }

  static async scrape() {
    console.log('Scraping Berita Harian...');
    const BH = new BeritaHarian();
    await BH.scrape()
      .then((results) => BH.saveInDb(results))
      .catch((error) => console.error('Failed to scrape Berita Harian', error));

    console.log('Scraping Utusan...');
    const utusan = new Utusan();
    await utusan.scrape()
      .then((results) => utusan.saveInDb(results))
      .catch((error) => console.error('Failed to scrape Utusan', error));

    console.log('Scraping SAYS News...');
    const says = new Says({ section: 'news' });
    await says.scrape()
      .then((results) => says.saveInDb(results))
      .catch((error) => console.error('Failed to scrape SAYS', error));

    console.log('Scraping SAYS Seismik...');
    const saysSeismik = new Says({ section: 'seismik', language: 'ms' });
    await saysSeismik.scrape()
      .then((results) => saysSeismik.saveInDb(results))
      .catch((error) => console.error('Failed to scrape SAYS', error));
  }

  run() {
    Scheduler.scrape();
    this.interval = setInterval(Scheduler.scrape, this.intervalTime);
  }
}
