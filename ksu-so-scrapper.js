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
			contactPersonIndex = (contactPersonIndex === -1 ? body.indexOf('PRO:') : contactPersonIndex);

			if (contactPersonIndex !== -1) {
				console.log(body.substring(contactPersonIndex, body.indexOf('<br', contactPersonIndex)));
			}

			var $ = cheerio.load(body);

			//Print website and social media links
			var websites = $('div[itemprop=articleBody] a');
			websites.each(function() {
				console.log($(this).attr('href'));
			});

			//Print mobile no (if specified)
			var mobileNoIndex = body.indexOf('Mobile:');
			if (mobileNoIndex !== -1) {
				console.log(body.substring(mobileNoIndex, body.indexOf('<br', mobileNoIndex)));
			}

			//Print email
			var emailAppendingScript = $('div[itemprop=articleBody] script').html();
			emailAppendingScript = emailAppendingScript.replace(/document.getElementById/g, '$');
			emailAppendingScript = emailAppendingScript.replace(/\('cloak/g, '(\'#cloak');
			emailAppendingScript = emailAppendingScript.replace(/innerHTML = ''/, 'html(\'\')');
			emailAppendingScript = emailAppendingScript.replace(/innerHTML \+= /, 'html(');
			var indexOfLastQuote = emailAppendingScript.lastIndexOf('\'') + 1;
			emailAppendingScript = emailAppendingScript.substring(0, indexOfLastQuote) + ')' + emailAppendingScript.substring(indexOfLastQuote+1);

			eval(emailAppendingScript);
			var email = $('div[itemprop=articleBody] span > a').text();
			console.log(email);

			console.log('\n');
		});
	});
});