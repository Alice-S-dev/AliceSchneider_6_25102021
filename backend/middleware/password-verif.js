const passwordSchema = require('../models/password'); //on récupère notre modèle de mot de passe

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) { //si le format de mot de passe n'est pas respecté', on affiche un message d'erreur
        res.status(400).json({ message: 'Le mot de passe doit contenir entre 8 et 25 caractères, dont au moins une majuscule, une minuscule, un chiffre, et aucun espace.' });
    } else { //si tout est ok, le mot de passe est validé
        next();
    }
};