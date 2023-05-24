require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const handleErrors = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOption = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

// парсим данные (собираем пакеты)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

// логгер запросов
app.use(requestLogger);

// cors запросы
app.use(cors(corsOption));

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// корневой роут
app.use(router);

// логгер ошибок
app.use(errorLogger);

// обработчики ошибок celebrate
app.use(errors());

// обрабатываем остальные ошибки
app.use(handleErrors);

app.listen(PORT, () => PORT);
