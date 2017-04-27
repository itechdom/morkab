var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	id: String,
	name: String,
	email: String,
	password: String, 
	activated:Boolean,
	admin: Boolean 
}));