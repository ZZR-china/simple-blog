var mongoose = require('mongoose');

var mongourl = process.env.mongo;

if (mongourl) {
    mongoose.connect(mongourl,{ server: { socketOptions: { keepAlive: 1 } } });
} else {
    var setting = require('../setting');
    var localurl = setting.url;
    mongoose.connect(localurl,{ server: { socketOptions: { keepAlive: 1 } } });
}

mongoose.set('debug', true);

module.exports = mongoose;