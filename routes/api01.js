var express = require('express');
var router = express.Router();
var db = require('../models/main');
var crypto = require('crypto');
var spider = require('../splider/superagent');

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

function finduser(db, id) {
    db.findOne(id, function(err, doc) {
        if (err) {
            return console.log(err);
        } else if (doc) {
            return true;
        } else if (!doc) {
            return false;
        }
    })
}

//get all user's name
router.get('/username', function(req, res, next) {
    db.User.find(null, 'name ', function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (doc) {
            res.send(doc);
        }
    })
})

//delete user by name
router.delete('/user/:name', function(req, res, next) {
    db.User.findOneAndRemove(req.params.name, function(err) {
        console.log(err)
    })
    res.send('ok')
})

//user register
router.post('/users', function(req, res, next) {
    var name = req.body.userName;
    var password = req.body.password;
    var resbody = { state: '' };
    var md5 = crypto.createHash('md5');
    var password = md5.update(password).digest('hex');
    var user = new db.User({
        name: name,
        password: password
    });
    var check = finduser(db.User, { name: name });
    if (check) {
        resbody.state = 'fail';
        res.send(resbody)
    } else {
        user.save(function(err, user) {
            if (err) {
                return console.log(err);
            }
            resbody.state = 'success';
            res.send(resbody)
        })
    }
    next();
})


//get user by id
router.get('/users/:id', function(req, res, next) {
    db.User.findById(req.params.id, function(err, u) {
        if (err) {
            return next({ err: 'ubable to find user!' });
        }

        res.json({
            name: u.name,
            password: u.password,

        })

        next();
    });
});



router.post('/login', function(req, res, next) {
    var name = req.body.userName,
        password = req.body.password,
        resBody = { state: '' };
    var password1 = md5(password);
    db.User.findOne({ name: name }, 'password', function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (!doc) {
            resBody.state = '账号不存在'
            res.send(resBody)
        } else if (doc.password === password1) {
            resBody.state = '登陆成功';
            res.send(resBody)
        } else {
            resBody.state = '密码错误';
            res.send(resBody)
        }
    })
})


//change user's password
router.put('/users/:name/:updatepassword', function(req, res, next) {
    var name = req.params.name,
        password = req.params.updatepassword;
    var passwordmd = md5(password);

    db.User.findOneAndUpdate({ name: name }, { $set: { password: passwordmd } }, function(err) {
        if (err) {
            console.log(err)
        }
        res.send('update success');
    });
})

// router.post('/delete', function(req, res, next) {
//     db.Article.findByIdAndRemove(req.body.id, function(err) {
//         console.log(err)
//     })
//     res.send('ok')
// })

router.get('/spider', function(req, res, next){
    spider.start(req, res);
})


var tree = require('../splider/tree')

router.get('/tree', function(req, res, next){
    // res.send(tree);
    res.satus(500);
})

function md5(pass){
    var md5 = crypto.createHash('md5');
    var newpass = md5.update(pass).digest('hex');
    return newpass
}

module.exports = router;
