const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

// вспомогательная ф-ия проверки id
const checkedId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (ObjectId.isValid(value)) return value;
    return helpers.message('Невалидный id');
  });

// вспомогательная ф-ия проверки email
const checkedEmail = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isEmail(value)) return value;
    return helpers.message('Неверный формат почты');
  });

// вспомогательная ф-ия проверки ссылки
const checkedLink = Joi.string()
  .custom((value, helpers) => {
    if (validator.isURL(value)) return value;
    return helpers.message('Неверный формат ссылки на изображение');
  });

const validateAuth = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: checkedLink,
  }),
});

const validateCard = celebrate({
  params: Joi.object().keys({
    cardId: checkedId,
  }),
});

const validateUser = celebrate({
  params: Joi.object().keys({
    userId: checkedId,
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: checkedLink,
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: checkedEmail,
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: checkedLink,
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: checkedEmail,
    password: Joi.string().required().min(4),
  }),
});

module.exports = {
  validateCreateCard,
  validateCard,
  validateUser,
  validateSignup,
  validateSignin,
  validateAuth,
  validateUserProfile,
  validateUserAvatar,
};
