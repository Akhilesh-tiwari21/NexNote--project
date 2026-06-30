import express from 'express';
import authController from '../controllers/auth.controller.js';

const routes = express.Router();

// Register Route
routes.post('/register', authController.userRegister);
// Login Route
routes.post('/login', authController.userLogin);
// Logout Route
routes.post('/logout', authController.userLogout);






export default routes ;

