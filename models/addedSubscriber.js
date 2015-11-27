var mongoose = require ('mongoose');
console.log('Model subscriber initialized');

var SubscriberSchema = new mongoose.Schema ({
    name: String,
    email: String
});

module.exports = mongoose.model('addedSubscriber',SubscriberSchema);