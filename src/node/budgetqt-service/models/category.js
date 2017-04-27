var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Category', new Schema({ 
	title: String,
	icon: String
}));