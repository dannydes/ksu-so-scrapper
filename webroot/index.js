var http = require('http'),
	fs = require('fs');

http.createServer(function(req, res) {
	res.writeHead(200, {'content-type': 'text-csv'});
	res.end(fs.readFileSync('organisations.csv'));
}).listen(80, 'localhost');