import app from './src/app.js';
import config from './src/config/config.js';
import connectDb from './src/config/database.js';

const PORT = config.PORT || 5000;

const serverStart = async() => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server is started on port number ${PORT}`);
    })
};


serverStart();