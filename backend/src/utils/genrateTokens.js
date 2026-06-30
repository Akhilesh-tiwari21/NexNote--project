import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const generateTokens = (user) => {

    const accessToken = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        config.JWT_SECRET,
        {
            expiresIn: '2h'
        }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id
        },
        config.JWT_SECRET,
        {
            expiresIn: '5d'
        }
    );

    return {
        accessToken,
        refreshToken
    };
};

export default generateTokens;