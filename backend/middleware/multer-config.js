const multer = require('multer'); //On importe multer pour pouvoir gérer les fichiers entrants dans les requêtes HTTP

//CONFIGURATION DE MULTER
const MIME_TYPES = { // on crée un "dictionnaire" pour récupérer l'extension du fichier envoyé par le frontend grâce à son mimetype
	'images/jpg' : 'jpg',
	'images/jpeg' : 'jpg',
	'images/png' : 'png'
};

const storage = multer.diskStorage ({ // notre objet de configuration a besoin de 2 éléments : une destination pour l'enregistrement des fichiers, et le nom de fichier à utiliser
	destination : (req, file, callback) => {
		callback(null, 'images'); //avec null on indique qu'il n'y a pas de pb, puis on donne le nom du dossier qui contiendra les fichiers envoyés
	},
	filename : (req, file, callback) => {
		const name = file.originalname.split(' ').join('_'); //on récupère le nom d'origine et s'il y a des espaces on les remplace par des underscores
		const extension = MIME_TYPES[file.mimetype]; //comme on n'a pas accès à l'extension du fichier envoyé, on va la générer grâce à son mimetype (image/jpeg, image/png...)
		callback(null, name + Date.now() + '.' + extension); //le nom de fichier sera composé du name, d'un timestamp pour le rendre le plus unique possible, et de l'extension 
	}
});

module.exports = multer({storage : storage}).single('image'); //on exporte notre middleware multer configuré
//on appelle la méthode single pour dire qu'il s'agit d'un fichier unique (pas d'un groupe de fichiers) et on précise qu'il s'agit uniquement de fichiers image