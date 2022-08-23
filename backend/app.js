const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

const errHandler = require('./middlewares/errHandler');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NoDataFound = require('./errors/NoDataFound');

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://mesto.lobachev.nomoredomains.sbs',
  'http://mesto.lobachev.nomoredomains.sbs',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use('/', authRouter);

app.use(cookieParser());
app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errorLogger);

app.use((req, res, next) => next(new NoDataFound('Неправильный маршрут')));
app.use(errors());
app.use(errHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.listen(PORT);
