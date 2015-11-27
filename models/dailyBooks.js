var mongoose = require ('mongoose');

var BookSchema = new mongoose.Schema ({
    itemId: Number,
    name: String,
    price: String
});

module.exports = mongoose.model('Book',BookSchema);
