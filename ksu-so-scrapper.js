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
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Chairperson:') : contactPersonIndex);

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
			var website = $('p > a[target=_blank]').filter(function() {
				var URL = $(this).attr('href');
				return URL !== 'https://www.hsbc.com.mt/1/2/mt/yes4' && URL !== 'http://www.bay.com.mt' &&
					URL !== 'http://www.publictransport.com.mt' && URL !== 'http://www.toyota.com.mt';
			}).attr('href');
			if (website) {
				console.log(website);
			}
		});
	});
});