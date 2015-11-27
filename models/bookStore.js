var mongoose = require('mongoose');

var BookStoreSchema = new mongoose.Schema({
    itemId: Number,
    itemTitle: String,
    timeToEnd: String,
    priceInfo: mongoose.Schema.Types.Mixed,
    photosInfo: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('BookStore', BookStoreSchema);