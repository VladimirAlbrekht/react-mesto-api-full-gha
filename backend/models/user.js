const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errors/authError');

// описание схемы пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'имя пользователя не может быть короче двух символов'],
    maxlength: [30, 'имя пользователя не может быть длиннее 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'информация о пользователе не может быть короче двух символов'],
    maxlength: [30, 'информация о пользователе не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный формат ссылки на изображение',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [4, 'пароль не может быть короче четырех символов'],
    select: false,
  },
});

// поиск пользователя в базе по введенным данным
userSchema.statics.findUserByCredentials = function getUserIfAuth(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неверный логин или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неверный логин или пароль'));
          }
          return user;
        });
    });
};

// удаляем из документа пользователя поле password
userSchema.methods.toJSON = function noShowPassword() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
