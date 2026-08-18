const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, "Review title is required!"],
        trim: true,
        minlength: 3,
        maxlength: 80,
    },

    comment: {
        type: String,
        required: [true, "Review Comment is required!"],
        trim: true,
        minlength: 10,
        maxlength: 500,
    },

    rating: {
        type: Number,
        required: [true, "Review rating is required!"],
        enum: [1, 2, 3, 4, 5],

        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not a whole number"
        }
    },

    reviewerName: {
        type: String,
        required: [true, "Review reviewer name is required!"],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },

    status: {
        type: String,
        enum: {
            values: ["pending", "approved", "rejected"],
            message: "{VALUE} is not a valid status"
        },
        default: "pending"
    },

    isVerifiedPurchase: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("review", reviewSchema);