var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Expense', new Schema({
	title: String,
	amount: Number,
	date: Date,
	category: String,
	tags:[String]
}));
