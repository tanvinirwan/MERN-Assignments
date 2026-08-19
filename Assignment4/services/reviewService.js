const ReviewModel = require("../model/reviewModel");


// CREATE REVIEW
const createReview = async ({
    title,
    comment,
    rating,
    reviewerName
}) => {

    const alreadyReviewed = await ReviewModel.findOne({
        reviewerName,
        title
    });

    if (alreadyReviewed) {
        throw new Error("Review already exists");
    }

    const review = await ReviewModel.create({
        title,
        comment,
        rating,
        reviewerName
    });

    return review;
};


// GET REVIEWS
const getReviews = async ({
    status,
    minRating,
    page = 1,
    limit = 10
}) => {

    const filter = {};

    if (status) {
        filter.status = status;
    }

    if (minRating) {
        filter.rating = {
            $gte: minRating
        };
    }

    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([

        ReviewModel.find(filter)
            .skip(skip)
            .limit(limit),

        ReviewModel.countDocuments(filter)

    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        reviews,
        total,
        page,
        totalPages
    };
};


// GET SINGLE REVIEW
const getSingleReview = async (id) => {

    const review = await ReviewModel.findById(id);

    if (!review) {
        const error = new Error("Review not found");
        error.statusCode = 404;
        throw error;
    }

    return review;
};


// UPDATE REVIEW
const updateReview = async (id, data) => {

    const review = await ReviewModel.findById(id);

    if (!review) {
        const error = new Error("Review not found");
        error.statusCode = 404;
        throw error;
    }

    Object.assign(review, data);

    await review.save();

    return review;
};


// DELETE REVIEW
const deleteReview = async (id) => {

    const review = await ReviewModel.findByIdAndDelete(id);

    if (!review) {
        const error = new Error("Review not found");
        error.statusCode = 404;
        throw error;
    }

    return review;
};


module.exports = {
    createReview,
    getReviews,
    getSingleReview,
    updateReview,
    deleteReview
};