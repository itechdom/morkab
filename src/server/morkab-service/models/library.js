var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Library', new Schema({
	title: String,
  bundleUrl: String,
  remoteUrl: String,
  elementList: Array
}));
