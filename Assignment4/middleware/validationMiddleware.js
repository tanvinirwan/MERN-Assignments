const validationMiddleware = (schema) => {

    return (req, res, next) => {

        const { error } = schema.validate({
            ...req.body,
            ...req.params,
            ...req.query
        });

        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details[0].message
            });
        }

        next();
    };
};

module.exports = validationMiddleware;