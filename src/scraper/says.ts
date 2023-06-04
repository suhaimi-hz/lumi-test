import { createHash } from 'crypto';
import { ArticleInterface } from '../interface';
import Puppeteer from '../lib/puppeteer';

import Article from '../article';

const saysUrl = 'https://says.com';

export default class Says extends Article {
  section: string;

  constructor({ section, language = 'en' }) {
    super(1);
    this.fetchImageWith = 'axios';
    this.publisherSlug = 'says';
    this.language = language; // Primary language
    this.section = section;
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

    details.date = new Date(details.date).toISOString();

    console.log('details', details);

    return { ...feed, ...details };
  }

  async scrape(): Promise<ArticleInterface[]> {
    let articles: ArticleInterface[] = [];

    const browser = await Puppeteer();
    const page = await browser.newPage();
    await page.goto(`${saysUrl}/my/${this.section}`, { waitUntil: 'domcontentloaded' });
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
      article.language = this.language;
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
