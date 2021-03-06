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

const config = require('./movies.config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const errorsHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000, DB_ADDRESS = config.dbUrlDev } = process.env;
const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// Подключаем логгер запросов перед limiter, иначе не будет записан запрос в логи
app.use(requestLogger);

app.use(helmet());
app.use(limiter);

app.use(cors({
  origin: ['localhost:3011', 'http://localhost:3011', 'http://movies.pupkova.nomoredomains.rocks', 'https://movies.pupkova.nomoredomains.rocks'],
  methods: ['GET', 'PUT', 'POST', ' DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Если нет корректного маршрута
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Обработка ошибок Celebrate
app.use(errors());

// Подключение центрального обработчика ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`You are listen ${PORT}`);
});
