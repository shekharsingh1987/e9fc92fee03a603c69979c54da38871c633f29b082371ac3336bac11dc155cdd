
var https = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var boolData = 0;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: true
}));



app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use('/', express.static(path.join(__dirname + '/client')));


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/client" });
});

//Get is for device
app.get('/api/get', function (req, res) {
    res.send({ "data": boolData });
});

//Post is for the Mobile APP.
app.post('/post', function (req, res) {
    var newBoolData = req.body.bool;
    boolData = newBoolData;
    res.send(200);
});

var port = process.env.PORT || 8080;
var server = https.createServer(app);

server.listen(port, function () {
    console.log('Home station server has started on port: ' + server.address().port);
});