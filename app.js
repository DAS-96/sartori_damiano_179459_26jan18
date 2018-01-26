
const express = require('express'),
    bodyParser = require('body-parser');

var check = require('./checker.js');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})

app.get('/check', function (req, res) {
  check("http://localhost:5000/count", {lato1: 3, lato2: 5}, {area: 15}, 200);
  res.send("OK");
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
