import userModel from '../models/user.model.js';
import generateTokens from '../utils/genrateTokens.js';
import config from '../config/config.js';

// USER SIGNUP LOGIC
const userRegister = async(req, res) => {
    try {
        const {name, username, email, password, role='user'} = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await userModel.findOne({
            $or: [{username}, {email: normalizedEmail}]
        });

        if (existingUser) {
            if (existingUser.email === normalizedEmail) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }

            if (existingUser.username === username) {
                return res.status(409).json({
                    message: "Username already exists"
                });
            }
        }

        if (password.length < 8 || password.length > 16) {
            return res.status(400).json({
                message: "Password must be between 8 and 16 characters"
            });
        }

        const user = await userModel.create({
            name,
            username,
            email: normalizedEmail,
            password,
            role
        });
        console.log(user);

        const {accessToken, refreshToken} = generateTokens(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            message: error.messaage
        });
    }
};

// USER LOGIN LOGIC
const userLogin = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        if ((!username && !email) || (!password)) {
            return res.status(400).json({
                message:  "Username/Email and password are required"
            });
        };

        const existingUser = await userModel.findOne({
            $or: [
                {username}, {email}
            ]
        }).select("+password");

        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid"
            });
        }

        const isPasswordValid = await existingUser.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid"
            });
        }

        const { accessToken, refreshToken } = generateTokens(existingUser);

        existingUser.refreshToken = refreshToken;
        await existingUser.save({
            validateBeforeSave: false
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 5 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// USER LOGOUT LOGIC
const userLogout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                message: "No refresh token found"
            });
        }

        const user = await userModel.findOne({ refreshToken });

        if (user) {
            user.refreshToken = null;

            await user.save({
                validateBeforeSave: false
            });
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: config.NODE_ENV === "development",
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Forget Password





export default{
    userRegister,
    userLogin,
    userLogout
}