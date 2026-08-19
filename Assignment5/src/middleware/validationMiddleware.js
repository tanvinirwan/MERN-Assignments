const { badRequest } = require("../utils/apiError");


const validationMiddleware = (schema) => {

    return (req, res, next) => {

        const data = {
            ...req.body,
            ...req.params,
            ...req.query
        };

        const { error } = schema.validate(data, {
            abortEarly: false
        });

        if (error) {

            const errors = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message
            }));

            return next(
                badRequest("Validation failed", errors)
            );
        }

        next();
    };
};


module.exports = validationMiddleware;