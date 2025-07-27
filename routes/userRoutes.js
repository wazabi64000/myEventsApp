import express from 'express';
 
import { protect } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';
 const router = express.Router();

router.get('/me', protect, async (req, res) => {
  try {
    // Récupérer l'utilisateur sans le mot de passe
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
