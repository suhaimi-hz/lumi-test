import { Model } from 'objection';

export default class Article extends Model {
  static get tableName() {
    return 'article';
  }

  static get relationMappings() {
    return {
      publisher: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/publisher`,
        join: {
          from: 'article.publisherSlug',
          to: 'publisher.slug',
        },
      },
    };
  }
}
