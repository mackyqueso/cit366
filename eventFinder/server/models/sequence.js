var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    maxEventId: {type: String}
});

module.exports = mongoose.model('Sequence', schema);