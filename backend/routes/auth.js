const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlValid } = require('../utils/urlValid');

const {
  login, createUser,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValid),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = router;
