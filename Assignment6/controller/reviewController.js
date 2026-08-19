const reviewService = require("../services/reviewService");


// CREATE
const createReview = async (req, res, next) => {

    try {

        const review = await reviewService.createReview(req.body);

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review
        });

    } catch (err) {

        next(err);

    }
};


// GET ALL
const getReviews = async (req, res, next) => {

    try {

        const reviews = await reviewService.getReviews(req.query);

        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });

    } catch (err) {

        next(err);

    }
};


// GET SINGLE
const getSingleReview = async (req, res, next) => {

    try {

        const review = await reviewService.getSingleReview(req.params.id);

        res.status(200).json({
            success: true,
            message: "Review fetched successfully",
            data: review
        });

    } catch (err) {

        next(err);

    }
};


// UPDATE
const updateReview = async (req, res, next) => {

    try {

        const review = await reviewService.updateReview(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review
        });

    } catch (err) {

        next(err);

    }
};


// DELETE
const deleteReview = async (req, res, next) => {

    try {

        const review = await reviewService.deleteReview(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: review
        });

    } catch (err) {

        next(err);

    }
};


module.exports = {
    createReview,
    getReviews,
    getSingleReview,
    updateReview,
    deleteReview
};