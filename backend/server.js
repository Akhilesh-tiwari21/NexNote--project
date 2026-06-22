import app from './src/app.js';

const PORT = 5000;

const serverStart = async() => {
    

    app.listen(PORT, () => {
        console.log(`Server is started on port number ${PORT}`);
    })
};


serverStart();