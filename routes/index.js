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

router.get('/user', function(req, res, next) {
    res.send("{user list}");
})

module.exports = router;
