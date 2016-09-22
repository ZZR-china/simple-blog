var mongoose = require('./connect');
var Schema = mongoose.Schema;

var testSchema = new Schema({
  name: string,
});

testSchema.methods.speak = function(){
  var greeting = this.name ? "meow name is" + this.name : "I do not have a name";
  console.log(greeting);
}


var Test = mongoose.model('Test',testSchema);

var slience = new Test({name: 'slience'});

slience.speak();

//meow name is slience

console.log(slience.name);

slience.save(function(err,slience){
  if (err) {
    return console.log(err);
  }else{
    slience.speak;
  }
});

Test.find(function(err,tests){
  if (err) {
    return console.log(err);
  }else{
    console.log(tests);
  }
});

Test.find({name: /^fluff/ }, callback);

module.exports = Test;