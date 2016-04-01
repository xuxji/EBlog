var express = require('express');
var router = express.Router();

/* 主页 */
router.get('/', function(req, res, next) {
    //res.send("{json: file}");   //返回json数据
    res.render(
        'index', 
        { title: 'EBlog', 
          desc: 'This is Jerry\'s blog' ,
          welcome: 'We do anything!'
        });  //返回渲染页面
});

router.route('/register')
    .get(function(req, res, next){
        //res.render('register', {title:'注册'});
        res.send('register');
    })
    .post(function(req, res, next){
        
    });
    
router.get('/login', function(req, res, next){
    res.send('login');
});
    
router.get('/logout', function(req, res, next){
    res.send('Logout');
})

router.route('/post')
    .get(function(req, res, next) {
        res.send('Post');
    })
    .post(function(req, res, next) {
        
    });
    
    
    

module.exports = router;
