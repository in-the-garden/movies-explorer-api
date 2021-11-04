const userRoutes = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/user');
const { validateEmptyBodyRequest, validateProfileUpdate } = require('../middlewares/validate');

userRoutes.get('/me', validateEmptyBodyRequest, getUser);
userRoutes.patch('/me', validateProfileUpdate, updateUserInfo);

module.exports = userRoutes;