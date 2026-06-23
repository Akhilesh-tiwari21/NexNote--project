import mongoose from "mongoose";

const downloadHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book is required"],
    },
    downloadedAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

// Optional: Improve query performance
downloadHistorySchema.index({ user: 1 });
downloadHistorySchema.index({ book: 1 });
downloadHistorySchema.index({ downloadedAt: -1 });

const DownloadHistory = mongoose.model("DownloadHistory", downloadHistorySchema);

export default DownloadHistory;