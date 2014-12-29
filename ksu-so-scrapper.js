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
				console.log('Problem fetching org!\n');
				return;
			}

			console.log($g(org).text().trim());

			var contactPersonIndex = body.indexOf('President:');
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Secretary General:') : contactPersonIndex);
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('Chairperson:') : contactPersonIndex);

			if (contactPersonIndex !== -1) {
				console.log(body.substring(contactPersonIndex, body.indexOf('<br', contactPersonIndex)));
			}

			var $ = cheerio.load(body);

			//Print website and social media links
			var websites = $('div[itemprop=articleBody] a').filter(function() {
				var URL = $(this).attr('href');
				return URL !== 'https://www.hsbc.com.mt/1/2/mt/yes4' && URL !== 'http://www.bay.com.mt' &&
					URL !== 'http://www.publictransport.com.mt' && URL !== 'http://www.toyota.com.mt';
			});
			websites.each(function() {
				console.log($(this).attr('href'));
			});

			//Placeholder for email extraction

			console.log('\n');
		});
	});
});