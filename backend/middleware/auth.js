const jwt = require('jsonwebtoken'); //on importe jsonwebtoken pour pouvoir créer et vérifier les tokens d'authentification

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //on récupère le token
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN); //on décode le token
    const userId = decodedToken.userId; //on récupère l'userId décodé
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID invalide!'; //erreur si l'userId de la requête est différent de l'userId récupéré
    } else { //si tout est ok on passe au prochain middleware
      next();
    }
  } catch {
    res.status(401).json({error: error | 'Requête non authentifiée!' });
  }
};