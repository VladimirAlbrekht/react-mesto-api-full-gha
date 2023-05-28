const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middlewares/errorHandler');
const rootRouter = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const NoFoundError = require('./errors/noFoundError');

const app = express();
app.use(cors({
  origin: 'https://mesto-15.nomoredomains.monster',
  credentials: true,
}));

dotenv.config();

// Подключаем middleware для обработки JSON в body запроса
app.use(express.json());

// Middleware для обработки cookies
app.use(cookieParser());

// Подключаем логгер запросов
app.use(requestLogger);

// Подключаем лимитер запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // не более 100 запросов за 15 минут
});
app.use(limiter);

// Делаем crash-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
}); 
// Подключаем корневой роутер
app.use(rootRouter);

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

// Подключаемся к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/mestobd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Подключение к базе данных установлено');
  })
  .catch((err) => {
    console.log(`Ошибка при подключении к базе данных: ${err.message}`);
  });

app.listen(3000, () => {
  console.log('Сервер запущен');
});
