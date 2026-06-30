import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [4, "Name must be at least 4 characters"],
        maxlength: [15, "Name cannot exceed 12 characters"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [8, "Username must be at least 8 characters"],
        maxlength: [16, "Username cannot exceed 16 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],

        select: false
    },
    profileImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        maxlength: 200,
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true });


userSchema.pre("save", async function () {
    // Don't hash again if password wasn't modified
    if (!this.isModified("password")) {
        return ;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        console.error(`error message ${error.message}`);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const user = mongoose.model('user', userSchema);

export default user;