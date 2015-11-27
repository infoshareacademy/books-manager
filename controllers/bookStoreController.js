var BookStore = require('./../models/bookStore.js');
var http = require('http');
var mongoose = require('mongoose');

exports.getBooks = function (req, res) {

    BookStore.find(function (err, bookStore) {
        if (err) {
            res.send(err);
        }
        res.json({item: bookStore});
    });
};


exports.refreshBooks = function (req, res) {
    http.get('http://localhost:8080/books/index.php', function (response) {

        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            if (body) {
                body = JSON.parse(body);

                mongoose.connection.db.dropCollection('bookstores', function (err) {
                    if (err) {
                        res.send(err);
                    }
                    body.item.forEach(function (book) {

                        var bookStore = new BookStore();

                        bookStore.itemId = +book.itemId;
                        bookStore.itemTitle = book.itemTitle;
                        bookStore.timeToEnd = book.timeToEnd;
                        bookStore.priceInfo = book.priceInfo;
                        bookStore.photosInfo = book.photosInfo;


                        bookStore.save(function (err) {
                            if (err) {
                            }
                        });
                    });
                });



            } else {
                res.send({message: 'Cos sie spierdolilo'});
            }
        });


    });
};



