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

const checkUser = (req, res, next)=>{
  const token = req.cookies.tokenAuth
  jwt.verify(token, SECRET_KEY, (err, decoded)=>{
      if(err) {
          return res.json({Message : "Erreur"})
      }else{
          req.nom = decoded.nom
          next()
      }

  })
}

app.get('/', checkUser, (req, res)=>{
  return res.json({Status : "OK", Nom: req.nom})
})

app.get('/logout', (req, res)=>{
  res.clearCookie("tokenAuth")
  return res.json({Status:"OK"})
})


const bcrypt = require('bcrypt');
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:3000',
  methods:["POST","GET"],
  credentials : true
}));

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
    }else{
      return res.json({ message : "non connu" });
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
