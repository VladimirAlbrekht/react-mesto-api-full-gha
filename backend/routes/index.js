const express = require('express');

const router = express.Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { checkAuth } = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

const app = express();

// Тестовый маршрут, который вызывает ошибку
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Открытые маршруты
router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use(checkAuth);

// Роутеры, требующие авторизации
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
