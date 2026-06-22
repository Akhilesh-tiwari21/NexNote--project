import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVar = [
    'PORT',
    'MONGO_URI'
];

requiredEnvVar.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`${envVar} is not defined in environment variables.`);
    }
});

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
};

export default config;