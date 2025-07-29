import express from 'express';
 
import { protect } from '../middlewares/authMiddleware.js';
import { getUsetById } from '../controllers/userControler.js';



const router = express.Router();

router.get('/me', protect, getUsetById);

export default router;
