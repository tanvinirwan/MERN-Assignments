const reviewService = require("../service/reviewService");


// CREATE
const createReview = async (req, res) => {

    const review = await reviewService.createReview(req.body);

    res.status(201).send({
        success: true,
        message: "Review created successfully",
        data: review
    });
};


// GET ALL
const getReviews = async (req, res) => {

    const reviews = await reviewService.getReviews(req.query);

    res.status(200).send({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews
    });
};


// GET SINGLE
const getSingleReview = async (req, res) => {

    const review = await reviewService.getSingleReview(req.params.id);

    res.status(200).send({
        success: true,
        message: "Review fetched successfully",
        data: review
    });
};


// UPDATE
const updateReview = async (req, res) => {

    const review = await reviewService.updateReview(
        req.params.id,
        req.body
    );

    res.status(200).send({
        success: true,
        message: "Review updated successfully",
        data: review
    });
};


// DELETE
const deleteReview = async (req, res) => {

    const review = await reviewService.deleteReview(req.params.id);

    res.status(200).send({
        success: true,
        message: "Review deleted successfully",
        data: review
    });
};


module.exports = {
    createReview,
    getReviews,
    getSingleReview,
    updateReview,
    deleteReview
};