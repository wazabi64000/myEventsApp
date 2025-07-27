# 1. Création du dossier du projet et positionnement dedans
mkdir backend-express-api
cd backend-express-api

# 2. Initialisation d'un projet Node.js avec package.json par défaut
npm init -y

# 3. Installation des dépendances nécessaires pour le backend
# express: framework web, mongoose: ODM MongoDB, dotenv: variables d'environnement
# bcryptjs: hashage mot de passe, jsonwebtoken: gestion JWT, multer: upload fichiers, cors: sécurité cross-origin
npm install express mongoose dotenv bcryptjs jsonwebtoken multer cors

# 4. Installation de nodemon en dev pour rechargement auto du serveur pendant le dev
npm install --save-dev nodemon

# 5. Création des dossiers nécessaires à l'organisation du projet
# config: config DB, controllers: logique métier, middlewares: fonctions intermédiaires,
# models: schemas mongoose, routes: déclaration des routes API, uploads: stockage fichiers
mkdir -p config controllers middlewares models routes uploads

# 6. Création des fichiers vides essentiels pour la structure et config
touch .env server.js \
      config/db.js \
      controllers/authController.js controllers/categoryController.js controllers/annonceController.js \
      middlewares/authMiddleware.js middlewares/uploadMiddleware.js \
      models/User.js models/Category.js models/Annonce.js \
      routes/authRoutes.js routes/categoryRoutes.js routes/annonceRoutes.js

# 7. Variables d'environnement sensibles stockées dans .env (jamais commiter sur git)
# PORT: port du serveur
# MONGO_URI: URL de connexion à MongoDB locale
# JWT_SECRET: clé secrète pour signer les tokens JWT
echo "PORT=5000
MONGO_URI=mongodb://localhost:27017/monprojetdb
JWT_SECRET=monsupersecretkey" > .env

# --- FIN DE LA CONFIGURATION DU PROJET ---

# 8. Exemples de requêtes CURL pour tester l'API (à lancer dans un terminal séparé)

# 8.1 Inscription d'un utilisateur
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username":"monuser","email":"monuser@example.com","password":"monpass123"}'

# 8.2 Connexion (login) pour récupérer un token JWT
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"monuser@example.com","password":"monpass123"}'

# 8.3 Récupérer toutes les catégories disponibles
curl http://localhost:5000/api/categories

# 8.4 Créer une nouvelle catégorie (ex: Immobilier)
curl -X POST http://localhost:5000/api/categories \
-H "Content-Type: application/json" \
-d '{"name":"Immobilier"}'

# 8.5 Récupérer toutes les annonces
curl http://localhost:5000/api/annonces

# 8.6 Créer une annonce avec image (requiert un token JWT valide et un ID de catégorie)
curl -X POST http://localhost:5000/api/annonces \
-H "Authorization: Bearer ton_jwt_token" \
-F "title=Maison à vendre" \
-F "description=Maison très jolie" \
-F "category=ID_de_la_categorie" \
-F "price=250000" \
-F "image=@/chemin/vers/image.jpg"
