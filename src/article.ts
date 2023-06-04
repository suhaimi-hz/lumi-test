import { ArticleInterface } from './interface';
import db from './db';

import ArticleModel from './models/article';
import Image from './lib/image';

const Model = ArticleModel.bindKnex(db);

export default class Article {
  publisherSlug: string;

  fetchImageWith: 'axios' | 'puppeteer';

  language;

  constructor(publisherSlug) {
    this.publisherSlug = publisherSlug;
    this.fetchImageWith = 'axios';
  }

  saveArticle(article) {
    return Model.query()
      .insert({
        ...article,
        publisherSlug: this.publisherSlug,
      })
      .returning('*')
      .then((result) => {
        console.log(`[NEW] (${this.publisherSlug}) ${article.title}`);
        return result;
      });
  }

  cacheImage(url: string) {
    if (!url || url === '') return '';
    const images = new Image();
    return images.fetchAndUpload(url, this.publisherSlug, this.fetchImageWith);
  }

  // Save new article into db
  saveInDb(articles: ArticleInterface[]) {
    const InsertPromise = [];
    for (let i = 0; i < articles.length; i += 1) {
      const article = articles[i];
      InsertPromise.push(
        // check if we already imported this news article
        Model.query()
          .where({
            publisherSlug: this.publisherSlug,
            sourceId: article.sourceId,
          })
          .first()
          .then(async (exists) => {
            if (exists) {
              console.log(`[EXiSTS] (${this.publisherSlug}) ${article.title}`);
              return exists;
            }
            // If not exists, insert into database
            article.imageUrl = await this.cacheImage(article.imageUrl);
            return this.saveArticle(article);
          }),
      );
    }
    return Promise.all(InsertPromise);
  }
}
