const router = require('express').Router();
const { validateUser, validateUserProfile, validateUserAvatar } = require('../middlewares/validation');

const {
  getUsers,
  findUser,
  findCurrentUser,
  updateUserAvatar,
  updateUserProfile,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsers);

// возвращает информацию о текущем пользователе
router.get('/me', findCurrentUser);

// возвращает пользователя по _id
router.get('/:userId', validateUser, findUser);

// обновляет профиль
router.patch('/me', validateUserProfile, updateUserProfile);

// обновляет аватар
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = router;
