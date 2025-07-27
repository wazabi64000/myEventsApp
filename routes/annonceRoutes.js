import express from 'express';
import { getAnnonces, createAnnonce } from '../controllers/annonceController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAnnonces);
router.post('/', upload.single('image'), createAnnonce);

export default router;
