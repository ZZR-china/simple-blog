var mongoose = require('mongoose');

var mongourl = process.env.mongo;

if (mongourl) {
    mongoose.connect(mongourl);
} else {
    var setting = require('../setting');
    var localurl = setting.url;
    mongoose.connect(localurl);
}

mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', function() {
    console.log('error')
})
db.once('open', function() {
    console.log('opened')
})

module.exports = mongoose;