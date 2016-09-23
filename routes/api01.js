var express = require('express');
var router = express.Router();
var db = require('../models/main');
var crypto = require('crypto');


router.get('/article', function(req, res, next) {
    var id = req.query.id
    db.Article.findOne({ _id: id }, function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (doc) {
            res.send(doc)
        }
    })
})

router.get('/articleList', function(req, res, next) {
    db.Article.find(null, 'title date', function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (doc) {
            res.send(doc)
        }
    })
})

function finduser(db, id){
    db.findOne(id,function(err,doc){
        if (err) {
            return console.log(err);
        }else if(doc){
            return true;
        }else if(!doc){
            return false;
        }
    })
}

//user register
router.post('/users', function(req, res, next) {
    var name = req.body.userName;
    var   password = req.body.password;
    var resbody = {state: ''};
    var md5 = crypto.createHash('md5');
    var password = md5.update(password).digest('hex');
    var user = new db.User({
        name: name,
        password: password
    });
    var check = finduser(db.User,{name:name});
    if (check) {
        resbody.state = 'fail';
    }else{
        user.save(function(err, user){
            if (err) {
                return console.log(err);
            }
            res.json({ id: user._id})
        })
    }
    next();
})

//get user by id
router.get('/users/:id', function(req, res, next){
    db.User.findById(req.params.id, function(err, u){
        if (err) {
            return next({err:'ubable to find user!'});
        }

        res.json({
            name: u.name,
            password: u.password,

        })

        next();
    });
});




// router.post('/delete', function(req, res, next) {
//     db.Article.findByIdAndRemove(req.body.id, function(err) {
//         console.log(err)
//     })
//     res.send('ok')
// })

module.exports = router;
