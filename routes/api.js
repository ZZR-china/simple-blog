var express = require('express');
var router = express.Router();
var db = require('../models/main');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('index', {});
})

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

    res.set({
      'Access-Control-Allow-Origin': *,
    })
    db.Article.find(null, 'title date', function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (doc) {
            res.send(doc)
        }
    })
})

router.post('/login', function(req, res, next) {
    var name = req.body.userName,
        password = req.body.password,
        resBody = { state: '' };
    var md5 = crypto.createHash('md5');
    var password = md5.update(password).digest('hex');

    db.User.findOne({ name: name }, 'password', function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (!doc) {
            resBody.state = '账号不存在'
            res.send(resBody)
        } else if (doc.password === password) {
            resBody.state = '登陆成功';
            res.send(resBody)
        } else {
            resBody.state = '密码错误';
            res.send(resBody)
        }
    })
})

router.post('/user', function(req, res, next) {
    var name = req.body.userName;
    var password = req.body.password;
    var resBody = { state: '' };
    db.User.findOne({ name: name }, 'password', function(err, doc) {
        if (err) {
            return console.log(err);
        } else if (doc) {
            resBody.state = 'usererr';
            res.send(resBody);
        } else if (!doc) {
            resBody.state = 'userright';
            res.send(resBody);
        }
    });
});


router.post('/save', function(req, res, next) {
    if (req.body.id) {
        var obj = {
            title: req.body.title,
            date: req.body.date,
            content: req.body.input
        }

        db.Article.findByIdAndUpdate(req.body.id, obj).exec();
    } else {
        var newArticle = new db.Article({
            title: req.body.title,
            date: req.body.date,
            content: req.body.input
        })
        newArticle.save(function(err) {
            if (err) return console.log(err)
        })
    }
    res.send('OK')
})

router.get('/links', function(req, res, next) {

    // var link = new db.Link({
    //     name: 'zhang',
    //     href: 'www.zhangzirui.com'
    // }).save(function(err) {
    //     if (err) return console.log(err)
    // })


    db.Link.find(null, 'name href', function(err, doc) {
        if (err) {
            return console.log(err)
        } else if (doc) {
            res.json({
                name: doc.name,
                href: doc.href,
            });
        } else if(!doc){
            res.json({
                name: 'zzr',
                href: 'www.zhangzirui.com'
            });
        }
    })

})

router.post('/setLinks', function(req, res, next) {
    db.Link.remove(null, function(err) {});
    var links = JSON.parse(req.body.links);
    links.forEach(function(item) {
        var link = new db.Link({
            name: item.name,
            href: item.href
        }).save(function(err) {
            if (err) return console.log(err)
        })
    })
    res.send('ok');
})

router.post('/savePw', function(req, res, next) {
    var name = req.body.userName,
        password = req.body.password
    db.User.findOneAndUpdate({ name: name }, { password: password },
        function() {})
    res.send('ok')
})

router.post('/delete', function(req, res, next) {
    db.Article.findByIdAndRemove(req.body.id, function(err) {
        console.log(err)
    })
    res.send('ok')
})

module.exports = router;
