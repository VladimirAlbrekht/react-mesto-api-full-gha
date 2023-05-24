const router = require('express').Router();

const {
  validateUser,
  validateUserProfile,
  validateUserAvatar,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

// защищенные маршруты

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateUserProfile, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);
router.get('/:userId', validateUser, getUserById);

module.exports = router;
