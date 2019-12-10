var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String}
});

module.exports = mongoose.model('Message', schema);