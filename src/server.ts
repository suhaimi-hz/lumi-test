// HTTP Server

import cors from 'cors';
import express from 'express';

import path from 'path';

import db from './db';

import ArticleModel from './models/article';

const Article = ArticleModel.bindKnex(db);

const app = express();
app.use(cors());

app.get('/article', async (req, res) => {
  const limit: number = Number(req.query.limit) || 10;
  const ArticleQuery = Article.query();
  const lang = String(req.query.lang);
  let page = Number(req.query.page);

  page -= 1;
  if (!page || page < 0) page = 0;

  if (['en', 'ms'].includes(lang)) {
    ArticleQuery.where('language', lang);
  }

  const articles = await ArticleQuery
    .select('author', 'date', 'title', 'link', 'imageUrl')
    .select('publisher.name as publisher')
    .leftJoinRelated('publisher')
    .orderBy('date', 'desc')
    .page(page, limit);

  res.json(articles);
});

app.use('/', express.static(path.join(__dirname, 'public_html')));

app.listen(3000);
