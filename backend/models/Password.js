
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema //On veut un mod de passe sécurisé, entre 8 et 25 caractères, contenant au moins une majuscule, une minucule, un chiffre, et pas d'espaces
.is().min(8)                                    
.is().max(25)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits()                                
.has().not().spaces()                    

module.exports = passwordSchema;