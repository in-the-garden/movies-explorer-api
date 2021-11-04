const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/user');
const NotFoundError = require('./errors/not-found-err');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateRegister, validateLogin } = require('./middlewares/validate');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors({
  origin: ['localhost:3011', 'http://localhost:3011', 'http://mesto.pupkova.nomoredomains.club', 'https://mesto.pupkova.nomoredomains.club'],
  methods: ['GET', 'PUT', 'POST', ' DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

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
  console.log(`We are live on ${PORT}`);
});
