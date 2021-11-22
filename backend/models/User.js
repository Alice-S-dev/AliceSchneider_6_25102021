const mongoose = require('mongoose'); //on importe mongoose pour modéliser nos données qui seront ajoutées à notre BDD
const uniqueValidator = require('mongoose-unique-validator'); //on importe le package unique validator pour pré-valider les infos avant d'enregistrer 

const userSchema = mongoose.Schema({ // on crée un schéma de données avec la méthode Schema de mongoose
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // pour être sûr qu'une adresse mail ne soit pas utilisée plusieurs fois (renforce unique : true)

module.exports = mongoose.model('User', userSchema);