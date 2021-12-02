const express = require('express'); // on importe le framework express pour simplifier le développement de notre API
const router = express.Router(); //on crée un routeur avec express

const userCtrl = require('../controllers/user');
const passwordVerification = require('../middleware/password-verif');
const emailVerification = require('../middleware/email-verification');

//route permettant à l'utilisateur de créer un compte
router.post('/signup', emailVerification, passwordVerification, userCtrl.signup);
//route permettant de se connecter à un compte existant
router.post('/login', userCtrl.login);

module.exports = router;