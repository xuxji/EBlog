//加载express，path等模块
var express = require('express');           
var path = require('path');                 
var favicon = require('serve-favicon');     
var logger = require('morgan');             
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var settings = require('./settings');

//将会话信息存储到Mongodb中
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//生成一个express实例app
var app = express();

//设置视图模板文件目录 __dirname 为全局变量,存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views')); 
//设置视图模块引擎为jade (也可以使用ejs等)
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public 
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//加载日志中间件
app.use(logger('dev'));  
//加载解析json的中间件
app.use(bodyParser.json()); 
//加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false })); 
//加载解析cookie的中间件
app.use(cookieParser()); 
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
//路由控制器
app.use('/', routes);
app.use('/users', users);

//secret 用来防止篡改 cookie，key 的值为 cookie 的名字，
//通过设置 cookie 的 maxAge 值设定 cookie 的生存期，
//这里我们设置 cookie 的生存期为 30 天，
//设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，
//以避免丢失
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));

//捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: 'error',
      message: err.message,
      error: err
    });
  });
}

//生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'error',
    message: err.message,
    error: {}
  });
});

//导出app实例供其他模块调用
module.exports = app;
