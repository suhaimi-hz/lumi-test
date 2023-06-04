import axios from 'axios';

import { ArticleInterface } from '../interface';
import Article from '../article';

const beritaHarianApi = 'https://www.bharian.com.my/api/articles?sttl=true&page_size=10';

export default class BeritaHarian extends Article {
  constructor() {
    super();
    this.fetchImageWith = 'puppeteer';
    this.publisherSlug = 'bh';
    this.language = 'ms';
  }

  protected ingest(rawData): ArticleInterface[] {
    const articles: ArticleInterface[] = [];
    for (let i = 0; i < rawData.length; i += 1) {
      const article = rawData[i];
      articles.push({
        sourceId: String(article.nid),
        title: article.title,
        imageUrl: article.field_image_listing_featured,
        date: new Date(Number(article.created) * 1000).toISOString(),
        author: article.field_article_author?.name || '',
        publisherSlug: this.publisherSlug,
        link: article.url,
        language: this.language,
      });
    }
    return articles;
  }

  scrape(): Promise<ArticleInterface[]> {
    return axios.get(beritaHarianApi)
      .then((response) => this.ingest(response.data))
      .catch((error) => {
        console.error('ERROR scraping berita harian: ', error?.response.data);
        // return empty array
        return [];
      });
  }
}
