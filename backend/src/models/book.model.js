import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'maximum 50 character']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [40, 'minimum 40 character'],
        maxlength: [120, 'maximum 120 character']
    },
    language: {
        type: String,
        required: true,
        enum: ['hindi', 'english'],
    },
    type: {
        type: String,
        enum: ['notes', 'book'],
        required: true
    },
    author: {
        type: String,
        required: function(){
            return this.type === 'book'
        }
    },
    publishedYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear(),
        required: function () {
            return this.type === "book";
        }
    },
    pdfUrl: {
        type: String,
        required: true,
        trim: true
    },
    totalPages: {
        type: Number,
        required: true,
        min: 1
    },
    averageRating: {
        type: Number,
        default: 0,
        min:0,
        max:5
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }

}, {timestamps: true});

const book = mongoose.model('book', bookSchema);

export default book;
