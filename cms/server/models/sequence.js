var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    maxDocumentId: {type: String},
    maxContactId: {type: String},
    maxMessageId: {type: String}
});

module.exports = mongoose.model('Sequence', schema);