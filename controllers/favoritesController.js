var FavoriteBook = require('./../models/favoriteBooks.js');
var http = require('http');
var mongoose = require('mongoose');

exports.addToFavoritesBooks = function (req, res) {

    var favoritesBook = new FavoriteBook();
    favoritesBook.itemId = +req.body.itemId;
    favoritesBook.itemTitle = req.body.itemTitle;
    favoritesBook.timeToEnd = req.body.timeToEnd;
    favoritesBook.priceValue = req.body.priceValue;
    favoritesBook.photoUrl = req.body.photoUrl;

    favoritesBook.save(function (err) {
        console.log('Favorite books saving end');
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'OK'});
        }
    });

};
exports.getFavoriteBooks = function (req, res) {

    FavoriteBook.find(function (err, favoriteBook) {
        if (err) {
            res.send(err);
        }
        res.json(favoriteBook);
    });
};

exports.deleteFromFavorite = function (req, res) {

    FavoriteBook.findByIdAndRemove(req.params.fav_id, function (err) {
        if (err) {
            res.send(err);
        }

        res.json({message: 'Favorite book successfully removed from db'});
    })
};

