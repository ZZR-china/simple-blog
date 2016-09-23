var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: String,
    author: String,
    body: String,
    type: String,
    date: { type: Date, default: Date.now },
});



var ArticleModel = mongoose.model('Article', articleSchema);

// assign a function to the "methods" object of our articleSchema
articleSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Article').find({ type: this.type }, cb);
};

var article = new Article({ type: 'dog' });

article.findSimilarTypes(function(err, types) {
    console.log(types);
});


module.exports = ArticleModel;
