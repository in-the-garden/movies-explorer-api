const mongoose = require('mongoose');
const { isURL } = require('validator');

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
      validator: (link) => {
        if (!isURL(link)) {
          throw new Error('Передан некорректный URL');
        }
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        if (!isURL(link)) {
          throw new Error('Передан некорректный URL');
        }
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        if (!isURL(link)) {
          throw new Error('Передан некорректный URL');
        }
      },
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
