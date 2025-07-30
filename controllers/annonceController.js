import Annonce from '../models/Annonce.js';

export const getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find().populate('category').populate('user', '-password');
    res.json(annonces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnonce = async (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  console.log('req.user:', req.user);

  const { title, description, category } = req.body;
  const price = Number(req.body.price);
const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const user = req.user._id; // Récupérer l'ID depuis req.user

  try {
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Prix invalide" });
    }

    const annonce = new Annonce({
      title,
      description,
      category,
      price,
      user,
      imageUrl
    });

    await annonce.save();

    res.status(201).json(annonce);
  } catch (error) {
    console.error("Erreur création annonce:", error);
    res.status(500).json({ message: error.message });
  }
};
