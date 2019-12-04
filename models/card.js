
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({
    name: String,
    cardNumber:Number,
    limit:Number,
    balance:Number,
});

module.exports = mongoose.model('Card', CardSchema);