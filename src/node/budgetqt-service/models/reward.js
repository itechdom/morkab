var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Reward', new Schema({ 
    id:Number,
    date:Date,
    amount:Number
}));