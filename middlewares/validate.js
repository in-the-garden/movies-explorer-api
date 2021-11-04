const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('Введен некорректный URL');
};

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
  }),
});

module.exports.validateUpdateInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports.ValidateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailer: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }).unknown(true),
});