const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateSignup, validateSignin, validateAuth } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const cardRouter = require('./cards');
const userRouter = require('./users');
const NotFoundError = require('../errors/notFoundError');

// роуты, не требующие авторизации
// роут регистрации
router.post('/signup', validateSignup, createUser);

// роут авторизации
router.post('/signin', validateSignin, login);

// мидлвэр авторизации
router.use(validateAuth, auth);

// роуты требующие авторизации
router.use('/users', userRouter);
router.use('/cards', cardRouter);

// роут выхода
router.get('/logout', (req, res) => {
  res.clearCookie('token').send();
});

router.use((req, res, next) => {
  next(new NotFoundError(`Запрашиваемый ресурс по адресу '${req.path}' не найден`));
});

module.exports = router;
