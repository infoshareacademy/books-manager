var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

var mailer = require('express-mailer');
var schedule = require('node-schedule');
var app = express();

app.set('view engine', 'jade');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var booksController = require('./controllers/booksController');
var bookStoreController = require('./controllers/bookStoreController');
var favoritesController = require('./controllers/favoritesController');
var subscriptionController = require('./controllers/subscriptionController');
var FavoritesBooks = require ('./models/favoriteBooks');
var addedSubscriber = require ('./models/addedSubscriber');

//connecting to database
mongoose.connect('mongodb://localhost:27017/booksnode');

mailer.extend(app, {
    from: 'infoshareacademy@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'infoshareacademy@gmail.com',
        pass: 'iSAforever'
    }
});
var refreshCron = schedule.scheduleJob('* * * * * 1', function () {
    bookStoreController.refreshBooks();

});
var mailerCron = schedule.scheduleJob('* * * * * 1', function () {
    http.get('http://localhost:8080/books-filter/web/app_dev.php?format=pretty', function (res) {
        var body = '';
        res.on('data', function (d) {
            body += d;
        });

        res.on('end', function () {
            var newBooks = JSON.parse(body);
            //pobieranie starych danych
            booksController.getBooks().then(function(oldBooks){
                if(oldBooks.length == 0) {
                    newBooks.forEach(function (item) {
                        booksController.saveBooks(item);
                    });
                }
                var uniqueBooks = [];
                newBooks.forEach(function(newBook){
                    var isNew = true;
                    oldBooks.forEach(function(oldBook){
                        if (newBook.itemId == oldBook.itemId){
                            console.log(newBook.itemId, oldBook.itemId);
                            isNew = false;
                        }
                    });
                    if (isNew === true){
                        console.log(newBook);
                        uniqueBooks.push(newBook);
                    }

                });

                app.mailer.send('emailTemplate', {
                    to: 'jaqbec@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
                    subject: 'Test Email',
                    books: uniqueBooks
                }, function (err) {
                    if (err) {
                        // handle error
                        console.log(err);
                        console.log('There was an error sending the email');
                        return;
                    } else {
                        console.log('mail sent');
                        mongoose.connection.db.dropCollection('books')
                            .then(function (err, result) {
                                newBooks.forEach(function (item) {
                                    booksController.saveBooks(item);
                                });
                            });
                    }
                });
            });

            ///zapis



        });

    });
});

var port = 3000;

var router = express.Router();

router.route('/books')
    .get(bookStoreController.getBooks)
    .post(bookStoreController.refreshBooks);

router.route('/favoritebooks')
    .post(favoritesController.addToFavoritesBooks)
    .get(favoritesController.getFavoriteBooks);

router.route('/favoritebooks/:fav_id')
    .delete(favoritesController.deleteFromFavorite);

router.route('/subscribers')
    .post(subscriptionController.addToSubcribers);

router.route('/subscribers/:subscriber_id')
    .get(subscriptionController.unsubcribeFromSubscribers);


app.use('', router);

app.listen(port);



