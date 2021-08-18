//This is an app to learn nodejs

const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//API Key pk_729ab0a7398f49c7968304fb6acdb4ed
function apicall(finishedApi, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_729ab0a7398f49c7968304fb6acdb4ed', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (res.statusCode === 200) {
            //console.log(body);
            finishedApi(body);
        };
    });
}

app.get('/', function(req, res) {
    apicall(function(doneApi) {
        res.render('home', {
            stock: doneApi
        });
    }, 'fb');
});

app.post('/', function(req, res) {
    apicall(function(doneApi) {
        //postedstuff = req.body.stock_ticker;
        res.render('home', {
            stock: doneApi,
        });
    }, req.body.stock_ticker);
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log("Listening on port " + PORT));