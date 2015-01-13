var express = require('express'),
	app = express(),
	fs = require('fs');

app.get('/download', function (request, response) {
	response.send(fs.readFileSync('organisations.csv'));
});

app.get('/open', function (request, response) {

});

app.listen(80);