const userRoutes = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/user');
const { validateUpdateInfo } = require('../middlewares/validate');

userRoutes.get('/me', getUser);
userRoutes.patch('/me', validateUpdateInfo, updateUserInfo);

module.exports = userRoutes;
