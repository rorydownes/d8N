const Joi = require('joi');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            const { name, details } = result.error;
            console.log(details);
            return res.status(400).json({
                errors: [{
                    type: name,
                    message: details.reduce((acc, cur) => [...acc, cur.message], []).join(', ')
                }]
            });
        }
        req.validated = { body: result.value };
        next();
    }
};


module.exports = {
    validateRequest,
};