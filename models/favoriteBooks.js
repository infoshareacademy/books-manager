var mongoose = require('mongoose');

var FavoritesBooksSchema = new mongoose.Schema({
    itemId: Number,
    itemTitle: String,
    timeToEnd: String,
    priceValue: String,
    photoUrl: String
});

module.exports = mongoose.model('FavoritesBooks', FavoritesBooksSchema);