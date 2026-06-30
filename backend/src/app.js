import express from 'express';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

//   /api/auth
app.use('/api/auth', authRoute);


export default app;