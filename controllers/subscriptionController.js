var Subscriber = require ('./../models/addedSubscriber')
var http = require('http');
var mongoose = require('mongoose');


exports.addToSubcribers = function (req,res){
    var newSubscriber = new Subscriber();
    newSubscriber.name = req.body.name;
    newSubscriber.email = req.body.email;

    newSubscriber.save(function(err){
        console.log('New subscriber added')
        if (err){
            res.send(err);
        }else{
            res.json({message: 'OK'})
        }
    })
};

exports.unsubcribeFromSubscribers = function (req, res) {

    Subscriber.findByIdAndRemove(req.params.subscriber_id, function (err) {
        if (err) {
            res.send(err);
        }

        res.json({message: 'Subscriber successfully removed from db'});
    })
};