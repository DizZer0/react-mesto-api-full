const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

const errHandler = require('./middlewares/errHandler');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NoDataFound = require('./errors/NoDataFound');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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
