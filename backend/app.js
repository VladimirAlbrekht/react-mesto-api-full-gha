const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const NoFoundError = require('./errors/noFoundError');

const errorHandler = require('./middlewares/errorHandler');
const rootRouter = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cookieParser());

// Добавляем middleware для обработки JSON в body запроса
app.use(express.json());

// Добавляем middleware для установки заголовка Content-Type
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Подключаемся к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestobd', { useNewUrlParser: true, useUnifiedTopology: true });

// Подключаем логгер запросов
app.use(requestLogger);

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

