const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { validateRequest } = require('../validation');
const { TokenRequired, LocalLoginRequired } = require('../utils/routeHelpers');

const UserController = require('../controllers/UserController');

const identifyUserSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
};

const createUserSchema = {
    ...identifyUserSchema,
    first: Joi.string(),
    last: Joi.string(),
    phone: Joi.string(),
    zip: Joi.string(),
};

router.route('/')
    .get(TokenRequired, UserController.listUsers)
    .post(validateRequest(createUserSchema), UserController.signup)
    .put(TokenRequired, UserController.updateUser)
    .delete(UserController.deleteUser);

router.route('/login')
    .post(validateRequest(identifyUserSchema), LocalLoginRequired, UserController.login);

module.exports = router;