const mongoose = require('mongoose'); //on importe mongoose pour modéliser nos données qui seront ajoutées à notre BDD

const sauceSchema = mongoose.Schema ({
	userId: { type: String, required: true }, //identifiant mongoDB unique de l'utilisateur qui a créé la sauce
	name: { type: String, required: true }, //nom de la sauce
	manufacturer: { type: String, required: true }, //fabricant de la sauce
	description: { type: String, required: true }, //description de la sauce
	mainPepper: { type: String, required: true }, //le principal ingrédient épicé de la sauce
	imageUrl: { type: String, required: true },  //l'URL de l'image de la sauce téléchargée par l'utilisateur
	heat: { type: Number, required: true }, //nombre entre 1 et 10 décrivant la sauce
	likes: { type: Number, required: false, default: 0 }, //nombre d'utilisateurs qui likent la sauce (par défaut : 0)
	dislikes: { type: Number, required: false, default: 0 }, //nombre d'utilisateurs qui dislikent la sauce (par défaut : 0)
	usersLiked: { type: [String], required: true }, //tableau des identifiants des utilisateurs qui ont liké la sauce
	usersDisliked: { type:[String], required: true }, //tableau des utilisateurs qui ont disliké la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema); 