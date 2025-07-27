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
  const { title, description, category, price } = req.body;
  const imageUrl = req.file ? req.file.path : null;
  const user = req.user._id;

  try {
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
    res.status(500).json({ message: error.message });
  }
};
