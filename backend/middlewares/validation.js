const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

// вспомогательная ф-ия проверки id
const checkedId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (ObjectId.isValid(value)) return value;
    return helpers.message('Невалидный id');
  });

const imageRegexLink = /^(https?:\/\/)(www\.)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?#?$/;

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(imageRegexLink),
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
    name: Joi.string().min(2).max(30).required,
    about: Joi.string().min(2).max(30).required,
  }),
});

//const imageRegexImg = /^https?:\/\/(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]+\.(png|jpg|jpeg|gif)$/;

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(1).presence('required'),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateCreateCard,
  validateCard,
  validateUser,
  validateSignup,
  validateSignin,
  validateUserProfile,
  validateUserAvatar,
};
