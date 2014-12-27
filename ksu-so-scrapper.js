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
			if (error || response.statusCode !== 200) {
				return;
			}

			console.log($g(org).text().substring(9));

			var contactPersonIndex = body.indexOf('President:');
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Secretary General:') : contactPersonIndex);

			if (contactPersonIndex !== -1) {
				console.log(body.substring(contactPersonIndex, body.indexOf('<br', contactPersonIndex)));
			}

			var $ = cheerio.load(body);
			
			//Print email
			var mailtoLinkIndex = body.indexOf('mailto:');
			if (mailtoLinkIndex !== -1) {
				mailtoLinkIndex += 7;
				console.log(body.substring(mailtoLinkIndex, body.indexOf('"', mailtoLinkIndex)));
			}

			//Print website
			console.log($('p > a[target=_blank]').attr('href'));
		});
	});
});