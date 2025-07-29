import multer from 'multer';
import path from 'path';

// 📦 Définition du stockage pour multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  }
});

// ✅ Liste des types MIME valides pour les images
const imageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/svg+xml',
  'image/x-icon',
  'image/heic',
  'image/heif',
  'image/avif'
];

// ✅ Liste des extensions valides
const imageExtensions = [
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff',
  '.tif', '.svg', '.ico', '.heic', '.heif', '.avif'
];

// 🔍 Middleware de filtrage : autorise uniquement les images
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isValidExt = imageExtensions.includes(ext);
  const isValidMime = imageMimeTypes.includes(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error(`Seules les images sont autorisées. Fichier : ${file.originalname}, Type : ${file.mimetype}`));
  }
};

// 📂 Middleware final prêt à l'emploi
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 } // 15 Mo max
});

export default upload;
