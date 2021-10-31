const mongoose = require('mongoose');
const { linkRegex } = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkRegex.test(link),
      message: 'Некорректный URL',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkRegex.test(link),
      message: 'Некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => linkRegex.test(link),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.String,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
  },
},
{ versionKey: false });

module.exports = mongoose.model('movie', movieSchema);