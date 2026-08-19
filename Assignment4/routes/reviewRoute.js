const express = require("express");

const router = express.Router();

const reviewController = require("../controller/reviewController");

const validationMiddleware = require("../middleware/validationMiddleware");

const {
    createReviewSchema,
    getReviewsSchema,
    reviewIdSchema,
    updateReviewSchema
} = require("../middleware/validationSchema/reviewSchema");


// CREATE REVIEW
router.post(
    "/createReview",
    validationMiddleware(createReviewSchema),
    reviewController.createReview
);


// GET ALL REVIEWS
router.get(
    "/getReviews",
    validationMiddleware(getReviewsSchema),
    reviewController.getReviews
);


// GET SINGLE REVIEW
router.get(
    "/getSingleReview/:id",
    validationMiddleware(reviewIdSchema),
    reviewController.getSingleReview
);


// UPDATE REVIEW
router.patch(
    "/updateReview/:id",
    validationMiddleware(reviewIdSchema),
    validationMiddleware(updateReviewSchema),
    reviewController.updateReview
);


// DELETE REVIEW
router.delete(
    "/deleteReview/:id",
    validationMiddleware(reviewIdSchema),
    reviewController.deleteReview
);


module.exports = router;