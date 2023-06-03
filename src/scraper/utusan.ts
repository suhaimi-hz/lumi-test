import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';
import Image from '../image';
import { ArticleInterface } from '../interface';
import Article from '../article';

type CustomItem = { author: string };

const utusanFeed = 'https://www.utusan.com.my/feed/';

export default class Utusan extends Article {
  constructor() {
    super(1);
    this.fetchImageWith = 'axios';
    this.publisherSlug = 'utusan';
  }

  cacheImage(url) {
    const image = new Image();
    return image.fetchAndUpload(url, this.publisherSlug, this.fetchImageWith);
  }

  scrape(): Promise<ArticleInterface[]> {
    const articles: ArticleInterface[] = [];
    const parser: Parser<CustomItem> = new Parser({
      customFields: {
        item: ['author'],
      },
    });

    return parser.parseURL(utusanFeed)
      .then((feed) => {
        for (let i = 0; i < feed.items.length; i += 1) {
          const article = feed.items[i];

          const contentDOM = new JSDOM(article.content);
          const imageUrl = contentDOM.window.document.querySelector('img').getAttribute('src');

          articles.push({
            sourceId: String(article.guid),
            title: article.title,
            imageUrl,
            date: article.isoDate,
            author: article.creator || '',
            publisherSlug: this.publisherSlug,
            link: article.link,
          });
        }

        return articles;
      })
      .catch((error) => {
        console.error('ERROR scaping utusan: ', error);
        // return empty array
        return articles;
      });
  }
}
