var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('ImportedExpense', new Schema({ 
	amount: Number,
	date: Date,
	tags:Array,
	file:String
}));