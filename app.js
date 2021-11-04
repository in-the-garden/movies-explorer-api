const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');

// Обработка ошибок в routes
const { errors } = require('celebrate');

// Защита заголовков
const helmet = require('helmet');

// Зашитится от автоматических входов
const limiter = require('./middlewares/rate-limiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: ['localhost:3011', 'http://localhost:3011', 'http://mesto.pupkova.nomoredomains.club', 'https://mesto.pupkova.nomoredomains.club'],
  methods: ['GET', 'PUT', 'POST', ' DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
})
  .catch((err) => {
    throw err;
  });

// Подключаем логгер запросов
app.use(requestLogger);

app.use(routes);

// Подключаем логгер ошибок
app.use(errorLogger);

// Если нет корректного маршрута
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// Обработка ошибок Celebrate
app.use(errors());

// Подключение центрального обработчика ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`You are listen ${PORT}`);
});
