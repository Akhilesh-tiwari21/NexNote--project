import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["published", "hidden"],
        default: "published",
    },
}, { timestamps: true } );

reviewSchema.index({ user: 1, book: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;