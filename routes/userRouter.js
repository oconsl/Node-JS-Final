const express = require('express');
const userController = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator();
const userValidator = require('../validations/userValidator');
const loginValidator = require('../validations/loginValidator');
const idValidator = require('../validations/idValidator');
const userQueryValidator = require('../validations/userQueryValidator');

const routes = (User) => {
  const userRouter = express.Router();

  const {
    getUsers,
    postUser,
    putUserById,
    deleteUserById,
    getUserByUserName,
    getUserById,
    userAuth,
  } = userController(User);

  userRouter
    .route('/users')
    .get(getUsers)
    .post(validator.body(userValidator), postUser);

  userRouter
    .route('/users/search')
    .get(validator.query(userQueryValidator), getUserByUserName);

  userRouter
    .route('/users/:userId')
    .get(validator.params(idValidator), getUserById)
    .put(
      validator.params(idValidator),
      validator.body(userValidator),
      putUserById
    )
    .delete(validator.params(idValidator), deleteUserById);

  userRouter
    .route('/users/login')
    .post(validator.body(loginValidator), userAuth);

  return userRouter;
};

module.exports = routes;
