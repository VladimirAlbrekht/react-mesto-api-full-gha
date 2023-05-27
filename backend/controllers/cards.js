const mongoose = require('mongoose');
const Card = require('../models/card');

const ValidationError = require('../errors/validationError');
const NoFoundError = require('../errors/noFoundError');
const NoRightsError = require('../errors/noRightsError');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.json(cards))
    .catch((error) => next(error));
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      return card.populate(['owner', 'likes']);
    })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new ValidationError(error.message));
      }
      return next(error);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new ValidationError('Некорректный формат id карточки'));
  }
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NoFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new NoRightsError('Вы не можете удалить карточку другого пользователя'));
      }
      return Card.findByIdAndRemove(cardId)
        .then((deletedCard) => res.status(200).json({
          message: 'Карточка успешно удалена',
          deletedCard,
        }));
    })
    .catch((error) => next(error));
  return {};
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new ValidationError('Некорректный формат id карточки'));
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return next(new NoFoundError('Карточка не найдена'));
      }

      return res.status(200).json(card);
    })
    .catch((error) => next(error));
  return {};
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return next(new ValidationError('Некорректный формат id карточки'));
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return next(new NoFoundError('Карточка не найдена'));
      }

      return res.status(200).json(card);
    })
    .catch((error) => next(error));
  return {};
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
