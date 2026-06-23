import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryType: {
        type: String,
        required: true,
        enum: ["academic", "skill"]
    },
    course: {
        type: String,
        trim: true,
        required: function () {
            return this.categoryType === "academic";
        }
    },
    semester: {
        type: Number,
        required: function () {
            return this.categoryType === "academic";
        },
        min: 1,
    },
    subject: {
        type: String,
        trim: true,
        required() {
            return this.categoryType === "academic";
        }
    },
    skill: {
        type: String,
        trim: true,
        required: function () {
            return this.categoryType === "skill";
        }
    }
}, { timestamps: true } );

const Category = mongoose.model("Category", categorySchema);

export default Category;