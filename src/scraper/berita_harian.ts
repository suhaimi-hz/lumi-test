import axios from 'axios';
import Image from '../image';

import { ArticleInterface } from '../interface';
import Article from '../article';

const beritaHarianApi = 'https://www.bharian.com.my/api/articles?sttl=true&page_size=10';

export default class BeritaHarian extends Article {
  constructor() {
    super(1);
    this.fetchImageWith = 'puppeteer';
    this.publisherSlug = 'bh';
  }

  cacheImage(url) {
    const image = new Image();
    return image.fetchAndUpload(url, this.publisherSlug, this.fetchImageWith);
  }

  scrape(): Promise<ArticleInterface[]> {
    const articles: ArticleInterface[] = [];

    return axios.get(beritaHarianApi)
      .then((response) => {
        for (let i = 0; i < response.data.length; i += 1) {
          const article = response.data[i];
          articles.push({
            sourceId: String(article.nid),
            title: article.title,
            imageUrl: article.field_image_listing_featured,
            date: new Date(Number(article.created) * 1000).toISOString(),
            author: article.field_article_author?.name || '',
            publisherSlug: this.publisherSlug,
            link: article.url,
          });
        }
        return articles;
      })
      .catch((error) => {
        console.error('ERROR scraping berita harian: ', error?.response.data);
        // return empty array
        return articles;
      });
  }
}
