 

# Documentation API pour Développeur Frontend

---

## 1. Base URL API


---

## 2. Endpoints disponibles

| Méthode | URL                    | Description                         | Auth requis |
|---------|------------------------|-----------------------------------|-------------|
| POST    | /auth/register         | Inscription utilisateur            | Non         |
| POST    | /auth/login            | Connexion utilisateur              | Non         |
| GET     | /categories            | Liste toutes les catégories        | Non         |
| POST    | /categories            | Création catégorie                 | Non         |
| GET     | /annonces              | Liste toutes les annonces          | Non         |
| POST    | /annonces              | Création annonce (avec image)     | Oui (JWT)   |

---
# 📘 Guide des Endpoints API – Pour Développeur Frontend

---

##  Authentification

###  Inscription
- **Méthode :** `POST`
- **URL :** `/api/auth/register`
- **Champs formulaire requis :**
  - `username` (texte)
  - `email` (texte)
  - `password` (texte)
- **Auth :**  Non

---

###  Connexion
- **Méthode :** `POST`
- **URL :** `/api/auth/login`
- **Champs formulaire requis :**
  - `email` (texte)
  - `password` (texte)
- **Auth :**  Non
- **Réponse :** Renvoie un `token` (à stocker et utiliser)

---

##  Catégories

###  Lister les catégories
- **Méthode :** `GET`
- **URL :** `/api/categories`
- **Auth :**  Non

---

###  Créer une catégorie
- **Méthode :** `POST`
- **URL :** `/api/categories`
- **Champs formulaire requis :**
  - `name` (texte)
- **Auth :**  Non

---

##  Annonces

###  Lister les annonces
- **Méthode :** `GET`
- **URL :** `/api/annonces`
- **Auth :**  Non

---

###  Créer une annonce
- **Méthode :** `POST`
- **URL :** `/api/annonces`
- **Type :** `multipart/form-data` (upload image)
- **Champs formulaire requis :**
  - `title` (texte)
  - `description` (texte)
  - `category` (ID de catégorie – texte)
  - `price` (nombre)
  - `image` (fichier)
- **Auth :**  Oui → `Authorization: Bearer <token>`

---

##  Remarques importantes

- Le **token JWT** est requis pour la route `POST /api/annonces`.  
  Il doit être envoyé dans le header :  
  `Authorization: Bearer <token>`

- L’image doit être envoyée via un champ `file` dans un formulaire `multipart/form-data`.

- Toutes les réponses sont au format **JSON**.

---

##  Base URL à utiliser


https://myeventsapp.onrender.com