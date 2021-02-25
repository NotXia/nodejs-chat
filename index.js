var express = require('express');

var app = express();

app.use('/', express.static('client/build'));

app.listen(3000, function () {
    console.log('http://localhost:3000');
});
