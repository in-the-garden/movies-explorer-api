const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const { validateRegister, validateLogin } = require('../middlewares/validate');

routes.post('/signup', validateRegister, createUser);
routes.post('/signin', validateLogin, login);

routes.use(auth);

routes.use('/movies', movieRoutes);
routes.use('/users', userRoutes);

module.exports = routes;