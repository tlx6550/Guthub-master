
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var logger = require('morgan');
var routes = require('./routes');
var bodyParser = require('body-parser');
var app = express();
// var favicon = require('serve-favicon');
// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '/routes')));
app.set('views', path.join(__dirname, 'app'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
// app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.methodOverride());
// app.use(app.router);
// require('./routes/index')(app);
app.use(express.static(path.join(__dirname, 'app')));

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 路由
app.get('/recipes', routes.list);
app.get('/recipe/:id', routes.detail);
app.post('/recipe/add', routes.add);
app.post('/recipe/edit/:id', routes.edit);
app.post('/recipe/del/:id', routes.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('正在监听端口： ' + app.get('port'));
});
