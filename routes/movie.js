const movieRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { ValidateCreateMovie, validateMovieId } = require('../middlewares/validate');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', ValidateCreateMovie, createMovie);
movieRoutes.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRoutes;