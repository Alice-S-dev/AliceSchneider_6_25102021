const bcrypt = require('bcrypt'); //on importe bcrypt pour le cryptage des mdp
const jwt = require('jsonwebtoken'); //on importe jsonwebtoken pour pouvoir créer et vérifier les tokens d'authentification

const User = require('../models/User'); // on importe le modèle User

//enregistrement d'un nouvel utilisateur
exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10) //bcrypt va hasher le mdp du corps de la requête, en effectuant 10 tours de l'algorithme de hachage
	.then(hash => { //une fois le hash créé, on crée un nouvel utilisateur et enregistre le mdp hashé dans la BDD
  		const user = new User({ 
   			email: req.body.email,
    		password: hash
  		});
  		user.save()
    		.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    		.catch(error => res.status(400).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));
};

//connexion d'un utilisateur existant
exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email }) //On cherche si un user de la BDD correspond au user entré dans l'appli
    .then(user => {
      if (!user) { //si on n'a pas trouvé d'user correspondant
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); //code 401 : non autorisé
      }
      bcrypt.compare(req.body.password, user.password) // sinon, bcrypt vompare le hash du mdp associé à l'utilisateur et le hash du mdp entré dans l'appli
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ //si tout est ok, on renvoir un userId et un token
            userId: user._id,
            token: jwt.sign(
              { userId: user._id }, //données à encoder dans le token (payload)
              'RANDOM_TOKEN_SECRET', //clé sercète pour l'encodage
              { expiresIn: '24h' } //configuration : on applique une expiration de 24h pour notre token
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};