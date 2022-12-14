const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const NoDataFound = require('../errors/NoDataFound');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const ServerError = require('../errors/ServerError');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.getByIdUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NoDataFound('Пользователь с таким id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NoDataFound('Пользователь с таким id не найден'));
      }
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else if (err.code === 11000) {
        next(new Conflict('пользователь с таким email уже существует'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ message: 'Авторизация успешна', token: token });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(new Unauthorized('Неправильные почта или пароль'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user,
    { name: name, about: about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user, { avatar: avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};
