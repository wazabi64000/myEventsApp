import express from 'express';
import upload from '../middlewares/upload.js';
import { createAnnonce, getAnnonces } from '../controllers/annonceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAnnonces);

// upload.single('image') --> Multer Cloudinary upload du champ "image"
router.post('/', protect, upload.single('image'), createAnnonce);

export default router;
