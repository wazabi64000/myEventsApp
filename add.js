import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5000/api';

const users = [
  { username: 'movdnuser', email: 'monuvdser@example.com', password: 'password123' }
  // tu peux en ajouter d’autres ici si tu veux
];

const categories = [
  'Immobilier', 'Véhicules', 'Électronique', 'Mode', 'Loisirs',
  'Services', 'Emploi', 'Maison', 'Éducation', 'Autres'
];

const imagePath = path.join(process.cwd(), 'uploads', 'sample.jpg');

if (!fs.existsSync(imagePath)) {
  console.error('Image introuvable:', imagePath);
  process.exit(1);
}

// Pour stocker les IDs créés
let createdUsers = [];
let createdCategories = [];

const annonces = [];
for (let i = 1; i <= 10; i++) {
  annonces.push({
    title: `Annonce ${i}`,
    description: `Description de l'annonce numéro ${i}`,
    category: '', // sera rempli après création des catégories
    price: Math.floor(Math.random() * 1000) + 50,
    imagePath,
    userId: '' // sera rempli après création de l’utilisateur
  });
}

async function createUser(user) {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`Utilisateur créé: ${res.data.username} (ID: ${res.data._id})`);
    return res.data._id;
  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.message === 'User already exists') {
      // Utilisateur existe déjà, on récupère son ID via login
      console.log(`Utilisateur ${user.email} existe déjà, récupération de l'ID via login`);
      try {
        const loginRes = await axios.post(`${BASE_URL}/users/login`, {
          email: user.email,
          password: user.password
        }, { headers: { 'Content-Type': 'application/json' } });
        return loginRes.data._id;
      } catch (loginErr) {
        console.error('Erreur login utilisateur existant:', loginErr.response?.data || loginErr.message);
        return null;
      }
    } else {
      console.error('Erreur création utilisateur:', err.response?.data || err.message);
      return null;
    }
  }
}

async function createCategory(name) {
  try {
    const res = await axios.post(`${BASE_URL}/categories`, { name }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(`Catégorie créée: ${name} (ID: ${res.data._id})`);
    return res.data._id;
  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.message === 'Category already exists') {
      // Récupérer l’ID de la catégorie déjà existante
      console.log(`Catégorie "${name}" existe déjà, récupération`);
      try {
        const allCats = await axios.get(`${BASE_URL}/categories`);
        const cat = allCats.data.find(c => c.name === name);
        return cat ? cat._id : null;
      } catch (getErr) {
        console.error('Erreur récupération catégories:', getErr.response?.data || getErr.message);
        return null;
      }
    } else {
      console.error(`Erreur création catégorie ${name}:`, err.response?.data || err.message);
      return null;
    }
  }
}

async function createAnnonce(annonce) {
  try {
    const form = new FormData();
    form.append('title', annonce.title);
    form.append('description', annonce.description);
    form.append('category', annonce.category);
    form.append('price', annonce.price);
    form.append('userId', annonce.userId);
    form.append('image', fs.createReadStream(annonce.imagePath));

    const res = await axios.post(`${BASE_URL}/annonces`, form, {
      headers: form.getHeaders()
    });
    console.log(`Annonce créée: ${annonce.title} (ID: ${res.data._id})`);
  } catch (err) {
    console.error(`Erreur création annonce ${annonce.title}:`, err.response?.data || err.message);
  }
}

async function main() {
  // 1. Créer les users
  for (const user of users) {
    const userId = await createUser(user);
    if (userId) createdUsers.push(userId);
  }

  if (createdUsers.length === 0) {
    console.error('Aucun utilisateur créé, arrêt.');
    return;
  }

  // 2. Créer les catégories
  for (const catName of categories) {
    const catId = await createCategory(catName);
    if (catId) createdCategories.push(catId);
  }

  if (createdCategories.length === 0) {
    console.error('Aucune catégorie créée, arrêt.');
    return;
  }

  // 3. Créer les annonces
  annonces.forEach((annonce) => {
    annonce.userId = createdUsers[0]; // ici premier user créé
    annonce.category = createdCategories[Math.floor(Math.random() * createdCategories.length)];
  });

  for (const annonce of annonces) {
    await createAnnonce(annonce);
  }

  console.log('Import complet.');
}

main();
