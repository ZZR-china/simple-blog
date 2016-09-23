var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
}, {
    collection: 'users'
});

var articleSchema = new Schema({
    title: String,
    date: Date,
    content: String,
});

var linkSchema = new Schema({
    name: String,
    href: String,
});

var User = mongoose.model('User', userSchema);
var Article = mongoose.model('Article', articleSchema);
var Link = mongoose.model('Link', linkSchema);

module.exports = {
    User: User,
    Article: Article,
    Link: Link
}
