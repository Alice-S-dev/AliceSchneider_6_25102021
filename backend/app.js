const express = require('express'); // on importe express

const bodyParser = require('body-parser'); //on importe bodyparser pour extraire l'objet JSON des requêtes
const mongoose = require('mongoose'); // on importe mongoose
const path = require('path'); //on importe path pour avoir accès au chemin de notre système de fichiers

const sauceRoutes = require('./routes/sauce'); //on importe nos routes sauce
const userRoutes = require('./routes/user'); //on importe nos routes utilisateur

//sécurité
const dotenv = require("dotenv").config(); //pour gérer les variables d'environnement afin de protéger les données sensibles
const helmet = require('helmet'); //pour sécuriser les entêtes HTTP et empêcher le détournement des infos
const rateLimit  =  require ('express-rate-limit'); //pour limiter le nombre de requêtes effectuées par un utilisateur/une adresse IP pour un temps donné
const mongoSanitize = require('express-mongo-sanitize'); // pour nettoyer le corps de la requête (pour éviter les injections de données)


//connexion à la BDD
//mongoose.connect('mongodb+srv://Admin_P6:OC-P6-admin@cluster-oc-p6.iaw1h.mongodb.net/Cluster-OC-P6?retryWrites=true&w=majority',
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('La connexion à MongoDB a réussi !'))
  .catch(() => console.log('La connexion à MongoDB a échoué !'));

const app = express();

//middleware pour résoudre les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limité à 100 requêtes
}));
app.use(mongoSanitize());
app.use('/images', express.static(path.join(__dirname, 'images'))); // on demande à notre fichier app.js de servir notre dossier statique 'images' quand il y a une requête

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

