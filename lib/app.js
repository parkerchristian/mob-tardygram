const express = require('express');
const app = express();
const mongoConnection = require('../lib/middleware/mongo-connection');
const { bearerToken } = require('../lib/middleware/ensureAuth');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());
app.use(bearerToken);
app.use('/instantgram/auth', mongoConnection, require('../lib/routes/auth'));
app.use('/instantgram/posts', mongoConnection, require('../lib/routes/post'));
app.use('/instantgram/comments', mongoConnection, require('../lib/routes/comments'));

module.exports = app;
