const express = require("express");

const router = express.Router();

const reviewController = require("../controller/reviewController");

const validationMiddleware = require("../middlewares/validationMiddleware");

const {
    createReviewSchema,
    getReviewsSchema,
    reviewIdSchema,
    updateReviewSchema
} = require("../reviewSchema");


// CREATE
router.post(
    "/createReview",
    validationMiddleware(createReviewSchema),
    reviewController.createReview
);


// GET ALL
router.get(
    "/getReviews",
    validationMiddleware(getReviewsSchema),
    reviewController.getReviews
);


// GET SINGLE
router.get(
    "/getSingleReview/:id",
    validationMiddleware(reviewIdSchema),
    reviewController.getSingleReview
);


// UPDATE
router.patch(
    "/updateReview/:id",
    validationMiddleware(reviewIdSchema),
    validationMiddleware(updateReviewSchema),
    reviewController.updateReview
);


// DELETE
router.delete(
    "/deleteReview/:id",
    validationMiddleware(reviewIdSchema),
    reviewController.deleteReview
);


module.exports = router;