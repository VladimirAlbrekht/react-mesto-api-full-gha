require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const rateLimit = require('express-rate-limit');
const NoFoundError = require('./errors/noFoundError');

const errorHandler = require('./middlewares/errorHandler');
const rootRouter = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const app = express();



// Добавляем middleware для обработки JSON в body запроса
app.use(express.json());

app.use(cookieParser());

// Подключаемся к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestobd', { useNewUrlParser: true, useUnifiedTopology: true });


// Подключаем логгер запросов
app.use(requestLogger);

// Разрешаем запросы только с определенных источников
const corsOptions = {
  origin: ['https://mesto-15.nomoredomains.monster', 'http://mesto-15.nomoredomains.monster', 'http://localhost:3001']
};

// Middleware для обработки CORS
app.use(cors(corsOptions));

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// Ограничение запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // не более 100 запросов за 15 минут
});

// Применяем лимитер для всех маршрутов
app.use(limiter);
// Подключаем корневой роутер
app.use(rootRouter);

// Подключаем логгер
app.use(errorLogger);

// Middleware для обработки ошибок celebrate
app.use(errors());

// Middleware для обработки несуществующих маршрутов
app.use((req, res, next) => {
  next(new NoFoundError('Запрашиваемый ресурс не найден'));
});

// Подключаем логгер ошибок
app.use(errorLogger);

// Middleware для обработки ошибок
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
