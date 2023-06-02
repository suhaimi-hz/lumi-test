import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { createHash } from 'crypto';
import { ArticleInterface } from '../interface';
import Image from '../image';
import Article from '../article';

puppeteer.use(StealthPlugin());

const saysUrl = 'https://says.com';

export default class Says extends Article {
  constructor() {
    super(1);
    this.fetchImageWith = 'axios';
    this.publisherSlug = 'says';
  }

  static cacheImage(url) {
    const image = new Image();
    return image.fetchAndUpload(url, 'says', 'axios');
  }

  private static async getArticleDetails(browser, feed) {
    const page = await browser.newPage();
    await page.goto(`${saysUrl}${feed.link}`, { waitUntil: 'domcontentloaded' });

    const details = await page.evaluate(() => {
      const { head } = document;
      return {
        title: head.querySelector('meta[property="og:title"]').getAttribute('content'),
        link: head.querySelector('meta[property="og:url"]').getAttribute('content'),
        imageUrl: head.querySelector('meta[property="og:image"]').getAttribute('content'),
        date: head.querySelector('meta[property="article:published_time"]').getAttribute('content'),
        author: head.querySelector('meta[name="author"]').getAttribute('content'),
      };
    });

    await page.close();
    return { ...feed, ...details };
  }

  async scrape(): Promise<ArticleInterface[]> {
    let articles: ArticleInterface[] = [];

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(`${saysUrl}/my`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('ul.news-feed-items');

    // get list of latest article
    const articleLinks = await page.evaluate(() => {
      const lists = [];
      document.querySelectorAll('ul.news-feed-items > li').forEach((li) => {
        const link = li.querySelector('H3 > a').getAttribute('href');
        lists.push({ link });
      });
      return lists;
    });
    page.close();

    const detailsPromise = [];

    // visit each article & retrieve details
    for (let i = 0; i < articleLinks.length; i += 1) {
      const article = articleLinks[i];
      article.publisherSlug = this.publisherSlug;
      article.sourceId = createHash('md5').update(article.link).digest('hex');
      detailsPromise.push(Says.getArticleDetails(browser, article));
    }

    // return results
    return Promise.all(detailsPromise)
      .then((results): ArticleInterface[] => {
        browser.close();
        articles = results;
        return articles;
      })
      .catch((error) => {
        console.log('ERROR scaping says: ', error);
        return articles;
      });
  }
}
