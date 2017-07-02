var quotes = require('./fortune-off.json');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/quote', function (request, response) {
    var randomQuoteId = Math.floor(Math.random() * quotes.length) + 1;
    response.json({
        quote: quotes.find(function (elem) {
            return elem.quoteInex === randomQuoteId;
        }).quoteLines
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});