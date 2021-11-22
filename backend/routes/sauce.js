//routes sauce

const express = require('express'); // on importe le framework express pour simplifier le développement de notre API
const router = express.Router(); //on crée un routeur avec express

sauceCtrl = require('../controllers/sauce'); //on implémente les contrôleurs sauce
const auth = require('../middleware/auth'); // on importe notre middleware d'authentification
const multer = require('../middleware/multer-config'); //on importe notre middleware de configuration de multer, pour gérer les fichiers utilisateurs


router.post('/', auth, multer, sauceCtrl.createSauce); //enregistrer une nouvelle sauce - multer est ajouté après auth, pour que l'authentification reste nécessaire pour ajouter une image
router.put('/:id', auth, multer, sauceCtrl.modifySauce);//modifier une sauce existante
router.delete('/:id', auth, sauceCtrl.deleteSauce);//supprimer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);//retrouver une sauce dans la BDD, par son identifiant
router.get('/', auth, sauceCtrl.getAllSauces);//envoyer un tableau de toutes les sauces de la BDD 
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce); //aimer ou ne pas aimer une sauce


module.exports = router; //on exporte le routeur (pour l'importer sur app.js)