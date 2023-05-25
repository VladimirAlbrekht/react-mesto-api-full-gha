const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const { generateToken } = require('../utils/token');

const ValidationError = require('../errors/validationError');
const NoFoundError = require('../errors/noFoundError');
const AuthError = require('../errors/authError');
const UserExistError = require('../errors/userExistError');

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser.toJSON());
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new ValidationError('Некорректные данные при создании пользователя.'));
    }
    if (error.code === 11000) {
      return next(new UserExistError('Пользователь с таким email уже существует'));
    }
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Неправильные почта или пароль'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AuthError('Неправильные почта или пароль'));
    }
    const token = generateToken({ _id: user._id });
    res.cookie('jwt', token);
    return res.cookie('jwt', token).send({ message: 'Авторизация прошла успешно' });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new ValidationError('Некорректный идентификатор пользователя'));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new NoFoundError('Запрашиваемый пользователь не найден'));
    }
    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NoFoundError('Пользователь не найден'));
    } return res.json(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(new NoFoundError('Пользователь не найден'));
      }
      return res.json(user);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return next(new ValidationError('Ошибка валидации.'));
      }
      return next(error);
    });
};

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      return next(new NoFoundError('Пользователь не найден'));
    }

    return res.json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(new ValidationError('Ошибка валидации.'));
    }
    return next(error);
  }
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
