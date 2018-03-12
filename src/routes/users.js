const Joi = require('joi');
const router = require('express-promise-router')();
const { validateRequest } = require('../validation');

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
    .get(UserController.listUsers)
    .post(validateRequest(createUserSchema), UserController.signup)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

router.route('/login')
    .post(validateRequest(identifyUserSchema), UserController.login);

module.exports = router;
