const express = require('express'); // on importe le framework express pour simplifier le développement de notre API
const router = express.Router(); //on crée un routeur avec express

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;