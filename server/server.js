const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const  SECRET_KEY = 'leCodeDeL-Api';

// Configuration de bodyParser pour analyser les corps de requête au format JSON
app.use(bodyParser.json()); 

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'app_fitness_jm',
  password: 'root',
  port: 5432,
});

const bcrypt = require('bcrypt');
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:3000',
  methods:["POST","GET"],
  credentials : true
}));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Si pas de token, renvoie une erreur 401 (Non autorisé)
  }

  jwt.verify(token, SECRET_KEY, { algorithms: ['RS256'] }, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Si le token est invalide, renvoie une erreur 403 (Interdit)
    }
    req.user = user;
    next(); // Si le token est valide, passe à l'étape suivante
  });
};
//vérification de connexion
app.post('/api/login', async (req, res) => {
  
  try {
      
    // Récupération des données de l'utilisateur depuis le corps de la requête
    const { email, password} = req.body;
  
    // Exécution de la requête de récupération des informations de l'utilisateur
    const result = await pool.query(
      'SELECT * FROM public.utilisateur WHERE email = $1',
      [email]
    );

    const match = await bcrypt.compare(password, result.rows[0].mot_de_passe);
    const nom = result.rows[0].prenom;
    if(match){
        const token = jwt.sign({nom}, "SECRET_KEY", {expiresIn : "1d"});
        res.cookie('tokenAuth',token);
    // Envoi de la réponse avec les données de l'utilisateur inséré
    return res.json({ message : nom });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'utilisateur :', error.message);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des données de l\'utilisateur' });
  }
});

app.post('/api/register', async (req, res) => {
  
    try {
        
      // Récupération des données de l'utilisateur depuis le corps de la requête
      const { usernom, userprenom, email, password} = req.body;
    
      const hash = await bcrypt.hash(password.toString(), 10);
    
      // Exécution de la requête d'insertion dans la base de données
      const result = await pool.query(
        'INSERT INTO public.utilisateur (nom, prenom, email, mot_de_passe) VALUES ($1, $2, $3, $4) RETURNING *',
        [usernom,userprenom, email, hash]
      );
  
      // Envoi de la réponse avec les données de l'utilisateur inséré
      res.json({ message: 'Utilisateur enregistré avec succès', utilisateur: result.rows[0] });
    } catch (error) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur :', error.message);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur' });
    }
  });

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public.utilisateur');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});


// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
