const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCard, validateCreateCard } = require('../middlewares/validation');

// возвращает все карточки
router.get('/', getCards);
// создает карточку
router.post('/', validateCreateCard, createCard);
// удаляет карточку по идентификатору
router.delete('/:cardId', validateCard, deleteCard);
// ставит лайк карточке
router.put('/:cardId/likes', validateCard, likeCard);
// убирает лайк с карточки
router.delete('/:cardId/likes', validateCard, dislikeCard);
module.exports = router;
