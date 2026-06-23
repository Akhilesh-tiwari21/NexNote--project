import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: true,
    }
}, { timestamps: true });

// Prevent duplicate wishlist entries
wishlistSchema.index({ user: 1, book: 1 }, { unique: true });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;