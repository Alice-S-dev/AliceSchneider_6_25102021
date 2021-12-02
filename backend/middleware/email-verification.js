
const regexEmail = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]+$/ //On définit le format de mail attendu avec les expressions régulières

module.exports = (req, res, next) => {
        if (!regexEmail.test(req.body.email)) { //On compare l'adresse mail entrée par l'utilisateur avec la regEx
            res.status(400).json({ message: "Veuillez entrer une adresse mail valide. Ex: Mon-adresse123@mail.fr"}); //Si l'adresse n'est pas au format attendu, on affiche une erreur
        } else {
            next(); 
        }
};

