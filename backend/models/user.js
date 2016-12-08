
/**
 * user.js
 * Model file for the user data
 * https://github.com/pello-io/simple-express-mongoose
 * Pello Altadill - http://pello.info
 */
var mongoose = require('mongoose');
//var createdDate = require('../plugins/createdDate');
//var validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
    userid: { type: String, lowercase: true, trim: true},
    name: { type: String, required: true},
    salt: { type: String, required: true },
    hash: { type: String, required: true },
  	provider		: String, // Cuenta del usuario (Twitter o Facebook en este ejemplo)
	provider_id : {type: String, unique: true}, // ID que proporciona Twitter o Facebook
	photo			 : String, // Avatar o foto del usuario
 	createdAt	 : {type: Date, default: Date.now} // Fecha de creación
});

// properties that do not get saved to the db
schema.virtual('fullname').get(function () {
  return this.name.first + ' ' + this.name.last;
})

module.exports = mongoose.model('User', schema, 'users');
