var Book = require ('./../models/dailyBooks');
var mongoose = require ('mongoose');
var q = require('q');

exports.saveBooks = function (bookToSave){
    var book = new Book();
    book.itemId = bookToSave.itemId;
    book.name = bookToSave.itemTitle;
    book.price = bookToSave.priceValue;

    book.save(function(err){
        if(err){
            console.log(err);
            //return false;
        }
    })
};

exports.getBooks = function () {
    var dfd = q.defer();

     Book.find(function (err, oldBooks) {
        if (err) {
            dfd.reject(err);
            console.log(err);
        } else {
            dfd.resolve(oldBooks);
        }
    });

    return dfd.promise;
};