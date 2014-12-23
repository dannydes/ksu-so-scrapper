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
			var key = 'President: ';
			var contactIndex = body.indexOf(key);
			
			if (contactIndex === -1) {
				key = 'Secretary General: ';
				contactIndex = body.indexOf(key);
			}

			if (contactIndex !== -1) {
				//console.log(body.substring(contactIndex + key.length, body.indexOf('<br> E-mail:')));
			}console.log(contactIndex + " " + body.indexOf('<br>E-mail:'));

			//var $ = cheerio.load(body);
			//console.log($('p span a').text());
		});
	});
});