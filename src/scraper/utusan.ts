import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';
import { ArticleInterface } from '../interface';
import Article from '../article';

type CustomItem = { author: string };

const utusanFeed = 'https://www.utusan.com.my/feed/';

export default class Utusan extends Article {
  constructor() {
    super();
    this.fetchImageWith = 'axios';
    this.publisherSlug = 'utusan';
    this.language = 'ms'; // Primary language
  }

  protected ingest(rawData): ArticleInterface[] {
    const articles: ArticleInterface[] = [];
    for (let i = 0; i < rawData.length; i += 1) {
      const article = rawData[i];

      const contentDOM = new JSDOM(article.content);
      let imageUrl = contentDOM.window.document.querySelector('img').getAttribute('src');

      if (!imageUrl) {
        let imageSet = contentDOM.window.document.querySelector('img').getAttribute('srcset');
        imageSet = imageSet.split(', ');
        if (Array.isArray(imageSet) && imageSet.length > 0) {
          imageSet = imageSet[0].split(' ');
          if (Array.isArray(imageSet) && imageSet.length > 0) {
            [imageUrl] = imageSet;
          }
        }
      }

      articles.push({
        sourceId: String(article.guid),
        title: article.title,
        imageUrl,
        date: article.isoDate,
        author: article.creator || '',
        publisherSlug: this.publisherSlug,
        link: article.link,
        language: this.language,
      });
    }
    return articles;
  }

  scrape(): Promise<ArticleInterface[]> {
    const parser: Parser<CustomItem> = new Parser({
      customFields: {
        item: ['author'],
      },
    });

    return parser.parseURL(utusanFeed)
      .then((feed) => this.ingest(feed.items))
      .catch((error) => {
        console.error('ERROR scaping utusan: ', error);
        // return empty array
        return [];
      });
  }
}
