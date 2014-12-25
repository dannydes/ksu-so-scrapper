var request = require('request'),
	cheerio = require('cheerio');

request({
	uri: 'http://ksu.org.mt/index.php/representation/student-organisations'
}, function(error, response, body) {
	var $g = cheerio.load(body);

	$g('td > a').each(function(index, org) {
		request({
			uri: 'http://ksu.org.mt' + $g(this).attr('href')
		}, function(error, response, body) {
			console.log($g(org).text().substring(9));

			var contactPersonIndex = body.indexOf('President:');
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Secretary General:') : contactPersonIndex);

			if (contactPersonIndex !== -1) {
				console.log(body.substring(contactPersonIndex, body.indexOf('<br', contactPersonIndex)));
			}

			var $ = cheerio.load(body);
			
			var email = $('p a').filter(function(index, a) {
				return /mailto/.test($(a).attr('href'));
			}).text();
			console.log(email);

			//Print website
			console.log($('p > a[target=_blank]').attr('href'));
		});
	});
});