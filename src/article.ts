import { ArticleInterface } from './interface';
import db from './db';

import ArticleModel from './models/article';
import Image from './lib/image';

const Model = ArticleModel.bindKnex(db);

export default class Article {
  publisherSlug: string;

  fetchImageWith: 'axios' | 'puppeteer';

  language;

  constructor() {
    this.fetchImageWith = 'axios';
  }

  // cache image url
  protected cacheImage(url: string) {
    if (!url || url === '') return '';
    const images = new Image();
    return images.fetchAndUpload(url, this.publisherSlug, this.fetchImageWith);
  }

  // Insert into database
  private insert(article) {
    return Model.query()
      .insert({
        ...article,
        publisherSlug: this.publisherSlug,
      })
      .then((result) => {
        console.log(`[NEW] (${this.publisherSlug}) ${article.title}`);
        return result;
      });
  }

  // check if article already exists
  private exists(sourceId) {
    return Model.query()
      .where({
        publisherSlug: this.publisherSlug,
        sourceId,
      })
      .first();
  }

  // Save new article into db
  checkAndInsert(articles: ArticleInterface[]) {
    const InsertPromise = [];
    for (let i = 0; i < articles.length; i += 1) {
      const article = articles[i];
      InsertPromise.push(
        // check if we already imported this news article
        this.exists(article.sourceId)
          .then(async (exists) => {
            if (exists) {
              console.log(`[EXiSTS] (${this.publisherSlug}) ${article.title}`);
              return exists;
            }
            // If not exists, insert into database
            article.imageUrl = await this.cacheImage(article.imageUrl);
            return this.insert(article);
          }),
      );
    }
    return Promise.all(InsertPromise);
  }
}
