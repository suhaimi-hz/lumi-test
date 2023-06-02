// HTTP Server

import express from 'express';

const app = express();

app.get('/article', (req, res) => {
  res.json({ hello: 'World!' });
});

app.listen(3000);
