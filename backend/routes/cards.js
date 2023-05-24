const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards');
const { validateCard, validateCreateCard } = require('../middlewares/validation');

// возвращает все карточки
router.get('/', getCards);

// создаёт карточку
router.post('/', validateCreateCard, createCard);

// удаляет карточку по _id
router.delete('/:cardId', validateCard, deleteCard);

// ставит лайк карточке
router.put('/:cardId/likes', validateCard, likeCard);

// убирает лайк с карточки
router.delete('/:cardId/likes', validateCard, dislikeCard);

module.exports = router;
