var request = require('request'),
	cheerio = require('cheerio');

request({
	uri: 'http://ksu.org.mt/index.php/representation/student-organisations'
}, function(error, response, body) {
	var $ = cheerio.load(body);

	$('td > a').each(function() {
		console.log($(this).text().substring(9));

		request({
			uri: 'http://ksu.org.mt' + $(this).attr('href')
		}, function(error, response, body) {
			var $ = cheerio.load(body);

			var orgInfo = $('p[style="text-align: justify;"]');
			console.log(orgInfo.children());
			//console.log($('p span a').text());
		});
	});
});