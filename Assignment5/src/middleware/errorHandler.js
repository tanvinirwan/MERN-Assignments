const notFound = (req, res, next) => {

    res.status(404).json({
        success: false,
        message: "Route not found",
        errors: []
    });

};


const errorHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;

    let message = err.message || "Internal server error";

    let errors = err.errors || [];


    // Mongoose CastError
    if (err.name === "CastError") {

        statusCode = 400;

        message = `Invalid value for '${err.path}'`;

        errors = [];
    }


    // Mongoose ValidationError
    else if (err.name === "ValidationError") {

        statusCode = 400;

        message = "Validation failed";

        errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message
        }));
    }


    // Duplicate key
    else if (err.code === 11000) {

        statusCode = 409;

        const field = Object.keys(err.keyPattern || {})[0];

        message = `This ${field || "value"} already exists`;

        errors = [];
    }


    // JWT invalid
    else if (err.name === "JsonWebTokenError") {

        statusCode = 401;

        message = "Invalid token";

        errors = [];
    }


    // JWT expired
    else if (err.name === "TokenExpiredError") {

        statusCode = 401;

        message = "Token has expired";

        errors = [];
    }


    // Unknown error
    else if (!err.statusCode) {

        statusCode = 500;

        message = "Internal server error";

        errors = [];
    }


    const response = {
        success: false,
        message,
        errors
    };


    if (process.env.NODE_ENV !== "production") {
        response.stack = err.stack;
    }


    res.status(statusCode).json(response);
};


module.exports = {
    notFound,
    errorHandler
};