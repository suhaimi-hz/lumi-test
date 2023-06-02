import { Model } from 'objection';

export default class Publisher extends Model {
  static get tableName() {
    return 'publisher';
  }

  static get relationMappings() {
    return {
      article: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/article`,
        join: {
          from: 'publisher.slug',
          to: 'article.publisher',
        },
      },
    };
  }
}
