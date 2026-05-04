import express from 'express';
import { register, login, logout, refresh } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);
// router.put('/update-member', updateMemberStatus); // Đã chuyển sang memberRequestRoutes

export default router;
