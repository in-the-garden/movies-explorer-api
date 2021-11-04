const movieRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const {
  validateEmptyBodyRequest,
  validateMovieCreate,
  validateMovieIdParams,
} = require('../middlewares/validate');

movieRoutes.get('/', validateEmptyBodyRequest, getMovies);
movieRoutes.post('/', validateMovieCreate, createMovie);
movieRoutes.delete('/:movieId', validateEmptyBodyRequest, validateMovieIdParams, deleteMovie);

module.exports = movieRoutes;